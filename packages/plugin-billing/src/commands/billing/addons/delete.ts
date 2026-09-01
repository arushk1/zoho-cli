import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingAddonsDelete extends BillingBaseCommand<typeof BillingAddonsDelete> {
  static id = 'billing addons delete'
  static summary = 'Delete an addon'

  static args = {
    id: Args.string({ description: 'Addon code', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/addons/${args.id}` })
        return
      }
      const data = await this.billingDelete(`/addons/${args.id}`)
      this.outputSuccess(data, { action: 'billing.addons.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
