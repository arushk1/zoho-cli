import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsApprove extends ExpenseBaseCommand<typeof ExpenseReportsApprove> {
  static id = 'expense reports approve'
  static summary = 'Approve an expense report'

  static args = {
    id: Args.string({ description: 'Expense report ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/expensereports/${args.id}/approve` })
        return
      }
      const data = await this.expensePost(`/expensereports/${args.id}/approve`)
      this.outputSuccess(data, { action: 'expense.reports.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
