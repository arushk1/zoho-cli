import { describe, it, expect, beforeEach } from 'vitest'
import { CrmBaseCommand } from '../src/crm-base-command.js'

// Zoho returns HTTP 200 with the per-record verdict in the body, so a rejected
// record used to be reported as `"success": true` with exit code 0.
const REJECTED = {
  code: 'INVALID_DATA',
  details: { expected_data_type: 'email', api_name: 'Email' },
  message: 'invalid data',
  status: 'error',
}

const ACCEPTED = {
  code: 'SUCCESS',
  details: { id: '1234567890', Modified_Time: '2026-08-04T12:00:00+05:30' },
  message: 'record added',
  status: 'success',
}

class TestCommand extends CrmBaseCommand<typeof TestCommand> {
  logged: string[] = []
  exitCode: number | undefined

  constructor() {
    super([], {} as any)
    this.flags = { pretty: false } as any
  }

  log(message?: string): void {
    this.logged.push(message ?? '')
  }

  exit(code = 0): never {
    this.exitCode = code
    throw new Error(`EEXIT:${code}`)
  }

  async run(): Promise<void> {}

  emit(payload: unknown) {
    return this.outputRecordResult(payload, { module: 'Leads', action: 'create' })
  }
}

const parseOutput = (cmd: TestCommand) => JSON.parse(cmd.logged[0])

describe('write results returned inside an HTTP 200', () => {
  let cmd: TestCommand

  beforeEach(() => {
    cmd = new TestCommand()
  })

  it('reports a rejected record as an error, not a success', () => {
    expect(() => cmd.emit(REJECTED)).toThrow(/EEXIT:1/)

    const out = parseOutput(cmd)
    expect(out.success).toBe(false)
    expect(out.error.code).toBe('INVALID_DATA')
    expect(out.error.message).toBe('invalid data')
    expect(out.error.details).toEqual({ expected_data_type: 'email', api_name: 'Email' })
  })

  it('exits non-zero on a rejected record so callers can detect the failure', () => {
    expect(() => cmd.emit(REJECTED)).toThrow()
    expect(cmd.exitCode).toBe(1)
  })

  it('still reports an accepted record as a success and does not exit', () => {
    cmd.emit(ACCEPTED)

    const out = parseOutput(cmd)
    expect(out.success).toBe(true)
    expect(out.data).toEqual(ACCEPTED)
    expect(out.meta).toEqual({ module: 'Leads', action: 'create' })
    expect(cmd.exitCode).toBeUndefined()
  })

  it('fails a bulk write when any single record was rejected', () => {
    expect(() => cmd.emit([ACCEPTED, REJECTED, ACCEPTED])).toThrow(/EEXIT:1/)

    const out = parseOutput(cmd)
    expect(out.success).toBe(false)
    expect(out.error.code).toBe('INVALID_DATA')
    // Must not read as a total failure: 2 of the 3 records were written.
    expect(out.error.message).toContain('1 of 3 records rejected')
    expect(out.error.details).toEqual([REJECTED])
  })

  it('passes a bulk write through when every record was accepted', () => {
    cmd.emit([ACCEPTED, ACCEPTED])

    expect(parseOutput(cmd).success).toBe(true)
    expect(cmd.exitCode).toBeUndefined()
  })
})
