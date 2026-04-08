import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersGet extends ExpenseBaseCommand<typeof ExpenseUsersGet> {
  static id = 'expense users get'
  static summary = 'Get a user by ID'

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/users/${args.id}`)
      this.outputSuccess(data.user ?? data, { action: 'expense.users.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
