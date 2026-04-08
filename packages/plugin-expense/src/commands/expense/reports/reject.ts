import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsReject extends ExpenseBaseCommand<typeof ExpenseReportsReject> {
  static id = 'expense reports reject'
  static summary = 'Reject an expense report'

  static args = {
    id: Args.string({ description: 'Expense report ID', required: true }),
  }

  static flags = {
    comments: Flags.string({ description: 'Rejection comments' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        const body = flags.comments ? { comments: flags.comments } : undefined
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/expensereports/${args.id}/reject`, body })
        return
      }
      const body = flags.comments ? { comments: flags.comments } : undefined
      const data = await this.expensePost(`/expensereports/${args.id}/reject`, body)
      this.outputSuccess(data, { action: 'expense.reports.reject' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
