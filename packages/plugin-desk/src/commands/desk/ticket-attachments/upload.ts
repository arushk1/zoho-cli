import { Flags } from '@oclif/core'
import FormData from 'form-data'
import { createReadStream } from 'node:fs'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketAttachmentsUpload extends DeskBaseCommand<typeof DeskTicketAttachmentsUpload> {
  static id = 'desk ticket-attachments upload'
  static summary = 'Upload an attachment to a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    file: Flags.string({ description: 'File path to upload', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const form = new FormData()
      form.append('file', createReadStream(flags.file))
      const data = await this.deskPost(`/tickets/${flags.ticket}/attachments`, form)
      this.outputSuccess(data, { action: 'desk.ticket-attachments.upload' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
