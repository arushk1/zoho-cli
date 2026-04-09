import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsCreate extends DeskBaseCommand<typeof DeskAccountsCreate> {
  static id = 'desk accounts create'
  static summary = 'Create a new Zoho Desk account'

  static flags = {
    data: Flags.string({ description: 'JSON data for the account', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.accounts.create.dry-run' })
        return
      }

      const data = await this.deskPost('/accounts', body)
      this.outputSuccess(data, { action: 'desk.accounts.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
