import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseOrganizationsGet extends ExpenseBaseCommand<typeof ExpenseOrganizationsGet> {
  static id = 'expense organizations get'
  static summary = 'Get an organization by ID'

  static args = {
    id: Args.string({ description: 'Organization ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/organizations/${args.id}`)
      this.outputSuccess(data.organization ?? data, { action: 'expense.organizations.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
