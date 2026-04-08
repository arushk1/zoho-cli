import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsClose extends ExpenseBaseCommand<typeof ExpenseTripsClose> {
  static id = 'expense trips close'
  static summary = 'Close a trip'

  static args = {
    id: Args.string({ description: 'Trip ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/trips/${args.id}/close` })
        return
      }
      const data = await this.expensePost(`/trips/${args.id}/close`)
      this.outputSuccess(data, { action: 'expense.trips.close' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
