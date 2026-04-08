import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTaxesGetGroup extends ExpenseBaseCommand<typeof ExpenseTaxesGetGroup> {
  static id = 'expense taxes get-group'
  static summary = 'Get a tax group by ID'

  static args = {
    id: Args.string({ description: 'Tax group ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/settings/taxgroups/${args.id}`)
      this.outputSuccess(data.tax_group ?? data, { action: 'expense.taxes.get-group' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
