import { describe, it, expect } from 'vitest'
import CrmBulkWriteUpload from '../../../src/commands/crm/bulk-write/upload.js'
import CrmBulkWriteCreate from '../../../src/commands/crm/bulk-write/create.js'
import CrmBulkWriteStatus from '../../../src/commands/crm/bulk-write/status.js'
import CrmBulkWriteDownload from '../../../src/commands/crm/bulk-write/download.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

describe('crm bulk-write upload', () => {
  it('has correct command id', () => {
    expect(CrmBulkWriteUpload.id).toBe('crm bulk-write upload')
  })

  it('has a summary', () => {
    expect(CrmBulkWriteUpload.summary).toBeDefined()
    expect(typeof CrmBulkWriteUpload.summary).toBe('string')
    expect(CrmBulkWriteUpload.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkWriteUpload.examples).toBeDefined()
    expect(Array.isArray(CrmBulkWriteUpload.examples)).toBe(true)
    expect((CrmBulkWriteUpload.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires --file flag', () => {
    expect(CrmBulkWriteUpload.flags.file).toBeDefined()
    expect(CrmBulkWriteUpload.flags.file.required).toBe(true)
  })

  it('has --dry-run flag', () => {
    expect(CrmBulkWriteUpload.flags['dry-run']).toBeDefined()
    expect(CrmBulkWriteUpload.flags['dry-run'].default).toBe(false)
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkWriteUpload)).toBe(true)
  })

  it('inherits --pretty and --api-version base flags', () => {
    expect(CrmBaseCommand.baseFlags.pretty).toBeDefined()
    expect(CrmBaseCommand.baseFlags['api-version']).toBeDefined()
  })
})

describe('crm bulk-write create', () => {
  it('has correct command id', () => {
    expect(CrmBulkWriteCreate.id).toBe('crm bulk-write create')
  })

  it('has a summary', () => {
    expect(CrmBulkWriteCreate.summary).toBeDefined()
    expect(typeof CrmBulkWriteCreate.summary).toBe('string')
    expect(CrmBulkWriteCreate.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkWriteCreate.examples).toBeDefined()
    expect(Array.isArray(CrmBulkWriteCreate.examples)).toBe(true)
    expect((CrmBulkWriteCreate.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmBulkWriteCreate.flags.module).toBeDefined()
    expect(CrmBulkWriteCreate.flags.module.required).toBe(true)
    expect(CrmBulkWriteCreate.flags.module.char).toBe('m')
  })

  it('requires --file-id flag', () => {
    expect(CrmBulkWriteCreate.flags['file-id']).toBeDefined()
    expect(CrmBulkWriteCreate.flags['file-id'].required).toBe(true)
  })

  it('has optional --operation flag with default of "insert"', () => {
    expect(CrmBulkWriteCreate.flags.operation).toBeDefined()
    expect(CrmBulkWriteCreate.flags.operation.required).toBeFalsy()
    expect(CrmBulkWriteCreate.flags.operation.default).toBe('insert')
  })

  it('restricts --operation to valid values', () => {
    const options = (CrmBulkWriteCreate.flags.operation as any).options as string[]
    expect(options).toContain('insert')
    expect(options).toContain('update')
    expect(options).toContain('upsert')
    expect(options).toHaveLength(3)
  })

  it('has --dry-run flag', () => {
    expect(CrmBulkWriteCreate.flags['dry-run']).toBeDefined()
    expect(CrmBulkWriteCreate.flags['dry-run'].default).toBe(false)
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkWriteCreate)).toBe(true)
  })
})

describe('crm bulk-write status', () => {
  it('has correct command id', () => {
    expect(CrmBulkWriteStatus.id).toBe('crm bulk-write status')
  })

  it('has a summary', () => {
    expect(CrmBulkWriteStatus.summary).toBeDefined()
    expect(typeof CrmBulkWriteStatus.summary).toBe('string')
    expect(CrmBulkWriteStatus.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkWriteStatus.examples).toBeDefined()
    expect(Array.isArray(CrmBulkWriteStatus.examples)).toBe(true)
    expect((CrmBulkWriteStatus.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires jobId arg', () => {
    expect(CrmBulkWriteStatus.args.jobId).toBeDefined()
    expect(CrmBulkWriteStatus.args.jobId.required).toBe(true)
  })

  it('has no --dry-run flag (read-only command)', () => {
    // status is a read-only command — it has no own static flags at all
    const ownFlags = CrmBulkWriteStatus.flags as Record<string, unknown> | undefined
    const dryRun = ownFlags?.['dry-run']
    expect(dryRun).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkWriteStatus)).toBe(true)
  })
})

describe('crm bulk-write download', () => {
  it('has correct command id', () => {
    expect(CrmBulkWriteDownload.id).toBe('crm bulk-write download')
  })

  it('has a summary', () => {
    expect(CrmBulkWriteDownload.summary).toBeDefined()
    expect(typeof CrmBulkWriteDownload.summary).toBe('string')
    expect(CrmBulkWriteDownload.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkWriteDownload.examples).toBeDefined()
    expect(Array.isArray(CrmBulkWriteDownload.examples)).toBe(true)
    expect((CrmBulkWriteDownload.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires jobId arg', () => {
    expect(CrmBulkWriteDownload.args.jobId).toBeDefined()
    expect(CrmBulkWriteDownload.args.jobId.required).toBe(true)
  })

  it('requires --output flag', () => {
    expect(CrmBulkWriteDownload.flags.output).toBeDefined()
    expect(CrmBulkWriteDownload.flags.output.required).toBe(true)
    expect(CrmBulkWriteDownload.flags.output.char).toBe('o')
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkWriteDownload)).toBe(true)
  })
})
