import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsUpdate extends ExpenseBaseCommand<typeof ExpenseTripsUpdate> {
  static id = 'expense trips update'
  static summary = 'Update a trip'

  static args = {
    id: Args.string({ description: 'Trip ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/trips/${args.id}`, body })
        return
      }
      const data = await this.expensePut(`/trips/${args.id}`, body)
      this.outputSuccess(data.trip ?? data, { action: 'expense.trips.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
