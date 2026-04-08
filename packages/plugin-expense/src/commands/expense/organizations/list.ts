import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseOrganizationsList extends ExpenseBaseCommand<typeof ExpenseOrganizationsList> {
  static id = 'expense organizations list'
  static summary = 'List Zoho Expense organizations'

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get<any>('/organizations')
      this.outputSuccess(data.organizations ?? [], { action: 'expense.organizations.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
