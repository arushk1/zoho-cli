import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesDelete extends ExpenseBaseCommand<typeof ExpenseCategoriesDelete> {
  static id = 'expense categories delete'
  static summary = 'Delete an expense category'

  static args = {
    id: Args.string({ description: 'Expense category ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/expensecategories/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/expensecategories/${args.id}`)
      this.outputSuccess(data, { action: 'expense.categories.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
