import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsDelete extends ExpenseBaseCommand<typeof ExpenseTripsDelete> {
  static id = 'expense trips delete'
  static summary = 'Delete a trip'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/trips/${args.id}` })
        return
      }
      const data = await this.expenseDelete(`/trips/${args.id}`)
      this.outputSuccess(data, { action: 'expense.trips.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
