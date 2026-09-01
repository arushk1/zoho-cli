import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCustomersDelete extends BillingBaseCommand<typeof BillingCustomersDelete> {
  static id = 'billing customers delete'
  static summary = 'Delete a customer'

  static args = {
    id: Args.string({ description: 'Customer ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/customers/${args.id}` })
        return
      }
      const data = await this.billingDelete(`/customers/${args.id}`)
      this.outputSuccess(data, { action: 'billing.customers.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
