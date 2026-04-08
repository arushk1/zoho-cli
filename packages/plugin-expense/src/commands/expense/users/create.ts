import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersCreate extends ExpenseBaseCommand<typeof ExpenseUsersCreate> {
  static id = 'expense users create'
  static summary = 'Create a user'

  static flags = {
    data: Flags.string({ description: 'JSON object with user fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/users', body })
        return
      }
      const data = await this.expensePost('/users', body)
      this.outputSuccess(data.user ?? data, { action: 'expense.users.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
