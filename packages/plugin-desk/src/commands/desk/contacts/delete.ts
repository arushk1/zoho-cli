import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsDelete extends DeskBaseCommand<typeof DeskContactsDelete> {
  static id = 'desk contacts delete'
  static summary = 'Delete a Zoho Desk contact'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.contacts.delete.dry-run' })
        return
      }
      await this.deskDelete(`/contacts/${args.id}`)
      this.outputSuccess(null, { action: 'desk.contacts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
