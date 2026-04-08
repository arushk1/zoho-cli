import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersAssignRole extends ExpenseBaseCommand<typeof ExpenseUsersAssignRole> {
  static id = 'expense users assign-role'
  static summary = 'Assign a role to a user'

  static args = {
    'user-id': Args.string({ description: 'User ID', required: true }),
    'role-id': Args.string({ description: 'Role ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/users/${args['user-id']}/role/${args['role-id']}` })
        return
      }
      const data = await this.expensePost(`/users/${args['user-id']}/role/${args['role-id']}`)
      this.outputSuccess(data, { action: 'expense.users.assign-role' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
