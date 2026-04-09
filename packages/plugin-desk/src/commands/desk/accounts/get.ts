import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsGet extends DeskBaseCommand<typeof DeskAccountsGet> {
  static id = 'desk accounts get'
  static summary = 'Get a Zoho Desk account by ID'

  static args = {
    id: Args.string({ description: 'Account ID', required: true }),
  }

  static flags = {
    include: Flags.string({ description: 'Comma-separated list of related data to include' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.include) params.include = flags.include

      const data = await this.deskGet(`/accounts/${args.id}`, params)
      this.outputSuccess(data, { action: 'desk.accounts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
