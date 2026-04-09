import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsUpdate extends DeskBaseCommand<typeof DeskContactsUpdate> {
  static id = 'desk contacts update'
  static summary = 'Update a Zoho Desk contact'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data to update the contact', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.contacts.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/contacts/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.contacts.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
