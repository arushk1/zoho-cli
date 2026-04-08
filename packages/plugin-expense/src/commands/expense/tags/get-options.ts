import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTagsGetOptions extends ExpenseBaseCommand<typeof ExpenseTagsGetOptions> {
  static id = 'expense tags get-options'
  static summary = 'Get all options for a reporting tag'

  static args = {
    id: Args.string({ description: 'Reporting tag ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/reportingtags/${args.id}/options/all`)
      this.outputSuccess(data.options ?? data, { action: 'expense.tags.get-options' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
