import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsUpdate extends DeskBaseCommand<typeof DeskAccountsUpdate> {
  static id = 'desk accounts update'
  static summary = 'Update a Zoho Desk account'

  static args = {
    id: Args.string({ description: 'Account ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data to update the account', required: true, char: 'd' }),
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
        this.outputSuccess(body, { action: 'desk.accounts.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/accounts/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.accounts.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
