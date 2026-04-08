import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsReimburse extends ExpenseBaseCommand<typeof ExpenseReportsReimburse> {
  static id = 'expense reports reimburse'
  static summary = 'Mark an expense report as reimbursed'

  static args = {
    id: Args.string({ description: 'Expense report ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Optional JSON object with reimbursement fields', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      if (flags.data) {
        try {
          body = JSON.parse(flags.data)
        } catch {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
      }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/expensereports/${args.id}/reimburse`, body })
        return
      }
      const data = await this.expensePost(`/expensereports/${args.id}/reimburse`, body)
      this.outputSuccess(data, { action: 'expense.reports.reimburse' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
