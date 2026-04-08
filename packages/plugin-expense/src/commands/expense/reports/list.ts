import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsList extends ExpenseBaseCommand<typeof ExpenseReportsList> {
  static id = 'expense reports list'
  static summary = 'List expense reports'

  static flags = {
    status: Flags.string({
      description: 'Filter by report status',
      options: ['draft', 'submitted', 'approved', 'rejected', 'reimbursed', 'recalled'],
    }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      if (flags.status) params.status = flags.status

      const data = await this.expenseGet('/expensereports', params)
      this.outputSuccess(data.expense_reports ?? [], {
        action: 'expense.reports.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.expense_reports?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
