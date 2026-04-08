import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTagsList extends ExpenseBaseCommand<typeof ExpenseTagsList> {
  static id = 'expense tags list'
  static summary = 'List reporting tags'

  async run(): Promise<void> {
    try {
      const data = await this.expenseGet('/reportingtags')
      this.outputSuccess(data.tags ?? [], {
        action: 'expense.tags.list',
        count: data.tags?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
