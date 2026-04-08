import { Args, Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsReject extends ExpenseBaseCommand<typeof ExpenseTripsReject> {
  static id = 'expense trips reject'
  static summary = 'Reject a trip'

  static args = {
    id: Args.string({ description: 'Trip ID', required: true }),
  }

  static flags = {
    comments: Flags.string({ description: 'Rejection comments' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        const body = flags.comments ? { comments: flags.comments } : undefined
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/trips/${args.id}/reject`, body })
        return
      }
      const body = flags.comments ? { comments: flags.comments } : undefined
      const data = await this.expensePost(`/trips/${args.id}/reject`, body)
      this.outputSuccess(data, { action: 'expense.trips.reject' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
