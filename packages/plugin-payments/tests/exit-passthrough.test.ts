import { describe, it, expect } from 'vitest'
import { PaymentsBaseCommand } from '../src/payments-base-command.js'

/**
 * `this.exit(n)` throws an oclif EEXIT error. Commands call resolveAccountId()
 * and the apiClient getter inside their try blocks, so a missing account ID or
 * unsupported region would otherwise be caught by handleApiError and reported a
 * second time as a bogus API failure — emitting two JSON envelopes and exiting 1
 * instead of 3.
 */
describe('handleApiError', () => {
  const handle = (PaymentsBaseCommand.prototype as any).handleApiError

  it('re-throws oclif exit signals instead of reporting them as API errors', () => {
    const exitSignal: any = new Error('EEXIT: 3')
    exitSignal.code = 'EEXIT'
    exitSignal.oclif = { exit: 3 }

    const emitted: string[] = []
    const ctx = {
      outputError: (code: string) => emitted.push(code),
      exit: () => { throw new Error('should not exit(1) on a control-flow signal') },
    }

    expect(() => handle.call(ctx, exitSignal)).toThrow(exitSignal)
    expect(emitted).toEqual([])
  })

  it('still reports genuine API errors', () => {
    const apiError: any = new Error('boom')
    apiError.response = { data: { code: 1002, message: 'Not found' } }

    const emitted: Array<[string, string]> = []
    const ctx = {
      outputError: (code: string, message: string) => emitted.push([code, message]),
      exit: (n: number) => { throw new Error(`exit:${n}`) },
    }

    expect(() => handle.call(ctx, apiError)).toThrow('exit:1')
    expect(emitted).toEqual([['1002', 'Not found']])
  })
})
