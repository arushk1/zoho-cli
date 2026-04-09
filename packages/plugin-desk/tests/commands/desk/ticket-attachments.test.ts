import { describe, it, expect } from 'vitest'
import DeskTicketAttachmentsList from '../../../src/commands/desk/ticket-attachments/list.js'
import DeskTicketAttachmentsGet from '../../../src/commands/desk/ticket-attachments/get.js'
import DeskTicketAttachmentsUpload from '../../../src/commands/desk/ticket-attachments/upload.js'
import DeskTicketAttachmentsDownload from '../../../src/commands/desk/ticket-attachments/download.js'
import DeskTicketAttachmentsDelete from '../../../src/commands/desk/ticket-attachments/delete.js'

describe('desk ticket-attachments list', () => {
  it('has correct command id', () => { expect(DeskTicketAttachmentsList.id).toBe('desk ticket-attachments list') })
  it('has summary', () => { expect(DeskTicketAttachmentsList.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketAttachmentsList.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketAttachmentsList.flags.ticket.char).toBe('t') })
})

describe('desk ticket-attachments get', () => {
  it('has correct command id', () => { expect(DeskTicketAttachmentsGet.id).toBe('desk ticket-attachments get') })
  it('has summary', () => { expect(DeskTicketAttachmentsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketAttachmentsGet.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketAttachmentsGet.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketAttachmentsGet.flags.ticket.char).toBe('t') })
})

describe('desk ticket-attachments upload', () => {
  it('has correct command id', () => { expect(DeskTicketAttachmentsUpload.id).toBe('desk ticket-attachments upload') })
  it('has summary', () => { expect(DeskTicketAttachmentsUpload.summary).toBeDefined() })
  it('requires --ticket flag', () => { expect(DeskTicketAttachmentsUpload.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketAttachmentsUpload.flags.ticket.char).toBe('t') })
  it('requires --file flag', () => { expect(DeskTicketAttachmentsUpload.flags.file.required).toBe(true) })
})

describe('desk ticket-attachments download', () => {
  it('has correct command id', () => { expect(DeskTicketAttachmentsDownload.id).toBe('desk ticket-attachments download') })
  it('has summary', () => { expect(DeskTicketAttachmentsDownload.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketAttachmentsDownload.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketAttachmentsDownload.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketAttachmentsDownload.flags.ticket.char).toBe('t') })
  it('requires --output flag', () => { expect(DeskTicketAttachmentsDownload.flags.output.required).toBe(true) })
  it('--output flag has char o', () => { expect(DeskTicketAttachmentsDownload.flags.output.char).toBe('o') })
})

describe('desk ticket-attachments delete', () => {
  it('has correct command id', () => { expect(DeskTicketAttachmentsDelete.id).toBe('desk ticket-attachments delete') })
  it('has summary', () => { expect(DeskTicketAttachmentsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketAttachmentsDelete.args.id.required).toBe(true) })
  it('requires --ticket flag', () => { expect(DeskTicketAttachmentsDelete.flags.ticket.required).toBe(true) })
  it('--ticket flag has char t', () => { expect(DeskTicketAttachmentsDelete.flags.ticket.char).toBe('t') })
})
