import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsDelete extends DeskBaseCommand<typeof DeskContactsDelete> {
  static id = 'desk contacts delete'
  static summary = 'Delete a Zoho Desk contact'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/contacts/${args.id}`)
      this.outputSuccess(null, { action: 'desk.contacts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
