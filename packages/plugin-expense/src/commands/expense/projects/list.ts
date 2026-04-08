import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseProjectsList extends ExpenseBaseCommand<typeof ExpenseProjectsList> {
  static id = 'expense projects list'
  static summary = 'List projects'

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
      const data = await this.expenseGet('/projects', params)
      this.outputSuccess(data.projects ?? [], {
        action: 'expense.projects.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.projects?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
