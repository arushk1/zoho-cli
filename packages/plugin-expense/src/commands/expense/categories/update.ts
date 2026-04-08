import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesUpdate extends ExpenseBaseCommand<typeof ExpenseCategoriesUpdate> {
  static id = 'expense categories update'
  static summary = 'Update an expense category'

  static args = {
    id: Args.string({ description: 'Expense category ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/expensecategories/${args.id}`, body })
        return
      }
      const data = await this.expensePut(`/expensecategories/${args.id}`, body)
      this.outputSuccess(data.expense_category ?? data, { action: 'expense.categories.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
