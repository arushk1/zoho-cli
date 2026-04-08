import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesEnable extends ExpenseBaseCommand<typeof ExpenseCategoriesEnable> {
  static id = 'expense categories enable'
  static summary = 'Enable an expense category'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/expensecategories/${args.id}/show` })
        return
      }
      const data = await this.expensePost(`/expensecategories/${args.id}/show`)
      this.outputSuccess(data, { action: 'expense.categories.enable' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
