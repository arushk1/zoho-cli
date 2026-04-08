import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesDisable extends ExpenseBaseCommand<typeof ExpenseCategoriesDisable> {
  static id = 'expense categories disable'
  static summary = 'Disable an expense category'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/expensecategories/${args.id}/hide` })
        return
      }
      const data = await this.expensePost(`/expensecategories/${args.id}/hide`)
      this.outputSuccess(data, { action: 'expense.categories.disable' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
