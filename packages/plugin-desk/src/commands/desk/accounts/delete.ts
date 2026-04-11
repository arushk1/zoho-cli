import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsDelete extends DeskBaseCommand<typeof DeskAccountsDelete> {
  static id = 'desk accounts delete'
  static summary = 'Delete a Zoho Desk account'

  static args = {
    id: Args.string({ description: 'Account ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.accounts.delete.dry-run' })
        return
      }
      await this.deskDelete(`/accounts/${args.id}`)
      this.outputSuccess(null, { action: 'desk.accounts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
