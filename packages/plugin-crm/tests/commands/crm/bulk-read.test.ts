import { describe, it, expect } from 'vitest'
import CrmBulkReadCreate from '../../../src/commands/crm/bulk-read/create.js'
import CrmBulkReadStatus from '../../../src/commands/crm/bulk-read/status.js'
import CrmBulkReadDownload from '../../../src/commands/crm/bulk-read/download.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

describe('crm bulk-read create', () => {
  it('has correct command id', () => {
    expect(CrmBulkReadCreate.id).toBe('crm bulk-read create')
  })

  it('has a summary', () => {
    expect(CrmBulkReadCreate.summary).toBeDefined()
    expect(typeof CrmBulkReadCreate.summary).toBe('string')
    expect(CrmBulkReadCreate.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkReadCreate.examples).toBeDefined()
    expect(Array.isArray(CrmBulkReadCreate.examples)).toBe(true)
    expect((CrmBulkReadCreate.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmBulkReadCreate.flags.module).toBeDefined()
    expect(CrmBulkReadCreate.flags.module.required).toBe(true)
    expect(CrmBulkReadCreate.flags.module.char).toBe('m')
  })

  it('has optional --criteria flag for JSON filter', () => {
    expect(CrmBulkReadCreate.flags.criteria).toBeDefined()
    expect(CrmBulkReadCreate.flags.criteria.required).toBeFalsy()
  })

  it('has optional --fields flag', () => {
    expect(CrmBulkReadCreate.flags.fields).toBeDefined()
    expect(CrmBulkReadCreate.flags.fields.required).toBeFalsy()
    expect(CrmBulkReadCreate.flags.fields.char).toBe('f')
  })

  it('has optional --page flag with default of 1', () => {
    expect(CrmBulkReadCreate.flags.page).toBeDefined()
    expect(CrmBulkReadCreate.flags.page.default).toBe(1)
    expect(CrmBulkReadCreate.flags.page.required).toBeFalsy()
  })

  it('has --dry-run flag', () => {
    expect(CrmBulkReadCreate.flags['dry-run']).toBeDefined()
    expect(CrmBulkReadCreate.flags['dry-run'].default).toBe(false)
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkReadCreate)).toBe(true)
  })

  it('inherits --pretty and --api-version base flags', () => {
    expect(CrmBaseCommand.baseFlags.pretty).toBeDefined()
    expect(CrmBaseCommand.baseFlags['api-version']).toBeDefined()
  })
})

describe('crm bulk-read status', () => {
  it('has correct command id', () => {
    expect(CrmBulkReadStatus.id).toBe('crm bulk-read status')
  })

  it('has a summary', () => {
    expect(CrmBulkReadStatus.summary).toBeDefined()
    expect(typeof CrmBulkReadStatus.summary).toBe('string')
    expect(CrmBulkReadStatus.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkReadStatus.examples).toBeDefined()
    expect(Array.isArray(CrmBulkReadStatus.examples)).toBe(true)
    expect((CrmBulkReadStatus.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires jobId arg', () => {
    expect(CrmBulkReadStatus.args.jobId).toBeDefined()
    expect(CrmBulkReadStatus.args.jobId.required).toBe(true)
  })

  it('has no --dry-run flag (read-only command)', () => {
    // status is a read-only command — it has no own static flags at all
    const ownFlags = CrmBulkReadStatus.flags as Record<string, unknown> | undefined
    const dryRun = ownFlags?.['dry-run']
    expect(dryRun).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkReadStatus)).toBe(true)
  })
})

describe('crm bulk-read download', () => {
  it('has correct command id', () => {
    expect(CrmBulkReadDownload.id).toBe('crm bulk-read download')
  })

  it('has a summary', () => {
    expect(CrmBulkReadDownload.summary).toBeDefined()
    expect(typeof CrmBulkReadDownload.summary).toBe('string')
    expect(CrmBulkReadDownload.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmBulkReadDownload.examples).toBeDefined()
    expect(Array.isArray(CrmBulkReadDownload.examples)).toBe(true)
    expect((CrmBulkReadDownload.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires jobId arg', () => {
    expect(CrmBulkReadDownload.args.jobId).toBeDefined()
    expect(CrmBulkReadDownload.args.jobId.required).toBe(true)
  })

  it('requires --output flag', () => {
    expect(CrmBulkReadDownload.flags.output).toBeDefined()
    expect(CrmBulkReadDownload.flags.output.required).toBe(true)
    expect(CrmBulkReadDownload.flags.output.char).toBe('o')
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmBulkReadDownload)).toBe(true)
  })
})
