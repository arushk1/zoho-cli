import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersActivate extends ExpenseBaseCommand<typeof ExpenseUsersActivate> {
  static id = 'expense users activate'
  static summary = 'Activate a user'

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/users/${args.id}/active` })
        return
      }
      const data = await this.expensePost(`/users/${args.id}/active`)
      this.outputSuccess(data, { action: 'expense.users.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
