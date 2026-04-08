import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersDeactivate extends ExpenseBaseCommand<typeof ExpenseUsersDeactivate> {
  static id = 'expense users deactivate'
  static summary = 'Deactivate a user'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/users/${args.id}/inactive` })
        return
      }
      const data = await this.expensePost(`/users/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'expense.users.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
