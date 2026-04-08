import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesCreate extends ExpenseBaseCommand<typeof ExpenseCategoriesCreate> {
  static id = 'expense categories create'
  static summary = 'Create an expense category'

  static flags = {
    data: Flags.string({ description: 'JSON object with category fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/expensecategories', body })
        return
      }
      const data = await this.expensePost('/expensecategories', body)
      this.outputSuccess(data.expense_category ?? data, { action: 'expense.categories.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
