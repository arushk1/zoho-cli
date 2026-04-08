import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsCancel extends ExpenseBaseCommand<typeof ExpenseTripsCancel> {
  static id = 'expense trips cancel'
  static summary = 'Cancel a trip'

  static args = {
    id: Args.string({ description: 'Trip ID', required: true }),
  }

  static flags = {
    comments: Flags.string({ description: 'Cancellation comments' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        const body = flags.comments ? { comments: flags.comments } : undefined
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/trips/${args.id}/cancel`, body })
        return
      }
      const body = flags.comments ? { comments: flags.comments } : undefined
      const data = await this.expensePost(`/trips/${args.id}/cancel`, body)
      this.outputSuccess(data, { action: 'expense.trips.cancel' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
