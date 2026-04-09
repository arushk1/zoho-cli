import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsDelete extends DeskBaseCommand<typeof DeskAccountsDelete> {
  static id = 'desk accounts delete'
  static summary = 'Delete a Zoho Desk account'

  static args = {
    id: Args.string({ description: 'Account ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/accounts/${args.id}`)
      this.outputSuccess(null, { action: 'desk.accounts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
