import { describe, it, expect } from 'vitest'
import AttachmentsList from '../../../src/commands/projects/attachments/list.js'
import AttachmentsUpload from '../../../src/commands/projects/attachments/upload.js'
import AttachmentsDelete from '../../../src/commands/projects/attachments/delete.js'

describe('projects attachments list', () => {
  it('has correct command metadata', () => {
    expect(AttachmentsList.id).toBe('projects attachments list')
  })

  it('has a summary', () => {
    expect(AttachmentsList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(AttachmentsList.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((AttachmentsList.flags.project as any).char).toBe('p')
  })

  it('supports --page flag', () => {
    expect(AttachmentsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((AttachmentsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(AttachmentsList.flags['per-page']).toBeDefined()
  })
})

describe('projects attachments upload', () => {
  it('has correct command metadata', () => {
    expect(AttachmentsUpload.id).toBe('projects attachments upload')
  })

  it('has a summary', () => {
    expect(AttachmentsUpload.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(AttachmentsUpload.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((AttachmentsUpload.flags.project as any).char).toBe('p')
  })

  it('requires --file flag', () => {
    expect(AttachmentsUpload.flags.file.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(AttachmentsUpload.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((AttachmentsUpload.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects attachments delete', () => {
  it('has correct command metadata', () => {
    expect(AttachmentsDelete.id).toBe('projects attachments delete')
  })

  it('has a summary', () => {
    expect(AttachmentsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(AttachmentsDelete.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(AttachmentsDelete.flags.project.required).toBe(true)
  })

  it('--project flag has -p shorthand', () => {
    expect((AttachmentsDelete.flags.project as any).char).toBe('p')
  })

  it('supports --dry-run flag', () => {
    expect(AttachmentsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((AttachmentsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
