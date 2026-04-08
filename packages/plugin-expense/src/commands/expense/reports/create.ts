import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsCreate extends ExpenseBaseCommand<typeof ExpenseReportsCreate> {
  static id = 'expense reports create'
  static summary = 'Create an expense report'

  static flags = {
    data: Flags.string({ description: 'JSON object with expense report fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/expensereports', body })
        return
      }
      const data = await this.expensePost('/expensereports', body)
      this.outputSuccess(data.expense_report ?? data, { action: 'expense.reports.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
