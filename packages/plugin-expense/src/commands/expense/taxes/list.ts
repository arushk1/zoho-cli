import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTaxesList extends ExpenseBaseCommand<typeof ExpenseTaxesList> {
  static id = 'expense taxes list'
  static summary = 'List taxes'

  static flags = {
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
      const data = await this.expenseGet('/settings/taxes', params)
      this.outputSuccess(data.taxes ?? [], {
        action: 'expense.taxes.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.taxes?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
