import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsApprovalHistory extends ExpenseBaseCommand<typeof ExpenseReportsApprovalHistory> {
  static id = 'expense reports approval-history'
  static summary = 'Get approval history for an expense report'

  static args = {
    id: Args.string({ description: 'Expense report ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/expensereports/${args.id}/approvalhistory`)
      this.outputSuccess(data.approval_history ?? data, { action: 'expense.reports.approval-history' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
