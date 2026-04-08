import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersDelete extends ExpenseBaseCommand<typeof ExpenseUsersDelete> {
  static id = 'expense users delete'
  static summary = 'Delete a user'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/users/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/users/${args.id}`)
      this.outputSuccess(data, { action: 'expense.users.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
