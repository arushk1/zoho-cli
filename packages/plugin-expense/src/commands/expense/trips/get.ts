import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsGet extends ExpenseBaseCommand<typeof ExpenseTripsGet> {
  static id = 'expense trips get'
  static summary = 'Get a trip by ID'

  static args = {
    id: Args.string({ description: 'Trip ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/trips/${args.id}`)
      this.outputSuccess(data.trip ?? data, { action: 'expense.trips.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
