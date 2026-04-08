import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCustomersList extends ExpenseBaseCommand<typeof ExpenseCustomersList> {
  static id = 'expense customers list'
  static summary = 'List customers'

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
      const data = await this.expenseGet('/contacts', params)
      this.outputSuccess(data.contacts ?? [], {
        action: 'expense.customers.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.contacts?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
