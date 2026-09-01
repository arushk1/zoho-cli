import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPlansUpdate extends BillingBaseCommand<typeof BillingPlansUpdate> {
  static id = 'billing plans update'
  static summary = 'Update a plan'

  static args = {
    id: Args.string({ description: 'Plan code', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/plans/${args.id}`, body })
        return
      }
      const data = await this.billingPut(`/plans/${args.id}`, body)
      this.outputSuccess(data.plan ?? data, { action: 'billing.plans.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
