import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseUsersList extends ExpenseBaseCommand<typeof ExpenseUsersList> {
  static id = 'expense users list'
  static summary = 'List users'

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
      const data = await this.expenseGet('/users', params)
      this.outputSuccess(data.users ?? [], {
        action: 'expense.users.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.users?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
