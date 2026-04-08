import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsCreate extends ExpenseBaseCommand<typeof ExpenseTripsCreate> {
  static id = 'expense trips create'
  static summary = 'Create a trip'

  static flags = {
    data: Flags.string({ description: 'JSON object with trip fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/trips', body })
        return
      }
      const data = await this.expensePost('/trips', body)
      this.outputSuccess(data.trip ?? data, { action: 'expense.trips.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
