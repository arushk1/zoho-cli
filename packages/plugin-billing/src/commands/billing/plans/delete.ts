import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPlansDelete extends BillingBaseCommand<typeof BillingPlansDelete> {
  static id = 'billing plans delete'
  static summary = 'Delete a plan'

  static args = {
    id: Args.string({ description: 'Plan code', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/plans/${args.id}` })
        return
      }
      const data = await this.billingDelete(`/plans/${args.id}`)
      this.outputSuccess(data, { action: 'billing.plans.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
