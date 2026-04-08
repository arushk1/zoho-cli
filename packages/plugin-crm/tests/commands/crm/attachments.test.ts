import { describe, it, expect } from 'vitest'
import CrmAttachmentsList from '../../../src/commands/crm/attachments/list.js'
import CrmAttachmentsUpload from '../../../src/commands/crm/attachments/upload.js'
import CrmAttachmentsDownload from '../../../src/commands/crm/attachments/download.js'
import CrmAttachmentsDelete from '../../../src/commands/crm/attachments/delete.js'
import { CrmBaseCommand } from '../../../src/crm-base-command.js'

describe('crm attachments list', () => {
  it('has correct command id', () => {
    expect(CrmAttachmentsList.id).toBe('crm attachments list')
  })

  it('has a summary', () => {
    expect(CrmAttachmentsList.summary).toBeDefined()
    expect(typeof CrmAttachmentsList.summary).toBe('string')
    expect(CrmAttachmentsList.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmAttachmentsList.examples).toBeDefined()
    expect(Array.isArray(CrmAttachmentsList.examples)).toBe(true)
    expect((CrmAttachmentsList.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmAttachmentsList.args.module).toBeDefined()
    expect(CrmAttachmentsList.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmAttachmentsList.args.id).toBeDefined()
    expect(CrmAttachmentsList.args.id.required).toBe(true)
  })

  it('has optional --page flag with default of 1', () => {
    expect(CrmAttachmentsList.flags.page).toBeDefined()
    expect(CrmAttachmentsList.flags.page.default).toBe(1)
    expect(CrmAttachmentsList.flags.page.required).toBeFalsy()
  })

  it('does not have --dry-run flag (read-only command)', () => {
    expect((CrmAttachmentsList.flags as any)['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmAttachmentsList)).toBe(true)
  })

  it('inherits --pretty and --api-version base flags', () => {
    expect(CrmBaseCommand.baseFlags.pretty).toBeDefined()
    expect(CrmBaseCommand.baseFlags['api-version']).toBeDefined()
  })
})

describe('crm attachments upload', () => {
  it('has correct command id', () => {
    expect(CrmAttachmentsUpload.id).toBe('crm attachments upload')
  })

  it('has a summary', () => {
    expect(CrmAttachmentsUpload.summary).toBeDefined()
    expect(typeof CrmAttachmentsUpload.summary).toBe('string')
    expect(CrmAttachmentsUpload.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmAttachmentsUpload.examples).toBeDefined()
    expect(Array.isArray(CrmAttachmentsUpload.examples)).toBe(true)
    expect((CrmAttachmentsUpload.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmAttachmentsUpload.args.module).toBeDefined()
    expect(CrmAttachmentsUpload.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmAttachmentsUpload.args.id).toBeDefined()
    expect(CrmAttachmentsUpload.args.id.required).toBe(true)
  })

  it('requires --file flag', () => {
    expect(CrmAttachmentsUpload.flags.file).toBeDefined()
    expect(CrmAttachmentsUpload.flags.file.required).toBe(true)
    expect(CrmAttachmentsUpload.flags.file.char).toBe('f')
  })

  it('has --dry-run flag with default false', () => {
    expect(CrmAttachmentsUpload.flags['dry-run']).toBeDefined()
    expect(CrmAttachmentsUpload.flags['dry-run'].default).toBe(false)
    expect(CrmAttachmentsUpload.flags['dry-run'].required).toBeFalsy()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmAttachmentsUpload)).toBe(true)
  })
})

describe('crm attachments download', () => {
  it('has correct command id', () => {
    expect(CrmAttachmentsDownload.id).toBe('crm attachments download')
  })

  it('has a summary', () => {
    expect(CrmAttachmentsDownload.summary).toBeDefined()
    expect(typeof CrmAttachmentsDownload.summary).toBe('string')
    expect(CrmAttachmentsDownload.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmAttachmentsDownload.examples).toBeDefined()
    expect(Array.isArray(CrmAttachmentsDownload.examples)).toBe(true)
    expect((CrmAttachmentsDownload.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmAttachmentsDownload.args.module).toBeDefined()
    expect(CrmAttachmentsDownload.args.module.required).toBe(true)
  })

  it('requires recordId arg', () => {
    expect(CrmAttachmentsDownload.args.recordId).toBeDefined()
    expect(CrmAttachmentsDownload.args.recordId.required).toBe(true)
  })

  it('requires attachmentId arg', () => {
    expect(CrmAttachmentsDownload.args.attachmentId).toBeDefined()
    expect(CrmAttachmentsDownload.args.attachmentId.required).toBe(true)
  })

  it('requires --output flag', () => {
    expect(CrmAttachmentsDownload.flags.output).toBeDefined()
    expect(CrmAttachmentsDownload.flags.output.required).toBe(true)
    expect(CrmAttachmentsDownload.flags.output.char).toBe('o')
  })

  it('does not have --dry-run flag (download is a read-fetch operation)', () => {
    expect((CrmAttachmentsDownload.flags as any)['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmAttachmentsDownload)).toBe(true)
  })
})

describe('crm attachments delete', () => {
  it('has correct command id', () => {
    expect(CrmAttachmentsDelete.id).toBe('crm attachments delete')
  })

  it('has a summary', () => {
    expect(CrmAttachmentsDelete.summary).toBeDefined()
    expect(typeof CrmAttachmentsDelete.summary).toBe('string')
    expect(CrmAttachmentsDelete.summary.length).toBeGreaterThan(0)
  })

  it('has examples defined', () => {
    expect(CrmAttachmentsDelete.examples).toBeDefined()
    expect(Array.isArray(CrmAttachmentsDelete.examples)).toBe(true)
    expect((CrmAttachmentsDelete.examples as string[]).length).toBeGreaterThan(0)
  })

  it('requires module arg', () => {
    expect(CrmAttachmentsDelete.args.module).toBeDefined()
    expect(CrmAttachmentsDelete.args.module.required).toBe(true)
  })

  it('requires recordId arg', () => {
    expect(CrmAttachmentsDelete.args.recordId).toBeDefined()
    expect(CrmAttachmentsDelete.args.recordId.required).toBe(true)
  })

  it('requires attachmentId arg', () => {
    expect(CrmAttachmentsDelete.args.attachmentId).toBeDefined()
    expect(CrmAttachmentsDelete.args.attachmentId.required).toBe(true)
  })

  it('does not have --dry-run flag (single-resource destructive, no body)', () => {
    expect((CrmAttachmentsDelete.flags as any)?.['dry-run']).toBeUndefined()
  })

  it('inherits from CrmBaseCommand', () => {
    expect(Object.prototype.isPrototypeOf.call(CrmBaseCommand, CrmAttachmentsDelete)).toBe(true)
  })
})
