import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTaxesGet extends ExpenseBaseCommand<typeof ExpenseTaxesGet> {
  static id = 'expense taxes get'
  static summary = 'Get a tax by ID'

  static args = {
    id: Args.string({ description: 'Tax ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/settings/taxes/${args.id}`)
      this.outputSuccess(data.tax ?? data, { action: 'expense.taxes.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
