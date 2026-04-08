import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCustomersGet extends ExpenseBaseCommand<typeof ExpenseCustomersGet> {
  static id = 'expense customers get'
  static summary = 'Get a customer by ID'

  static args = {
    id: Args.string({ description: 'Customer ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/contacts/${args.id}`)
      this.outputSuccess(data.contact ?? data, { action: 'expense.customers.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
