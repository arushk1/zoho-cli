import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCustomersUpdate extends BillingBaseCommand<typeof BillingCustomersUpdate> {
  static id = 'billing customers update'
  static summary = 'Update a customer'

  static args = {
    id: Args.string({ description: 'Customer ID', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/customers/${args.id}`, body })
        return
      }
      const data = await this.billingPut(`/customers/${args.id}`, body)
      this.outputSuccess(data.customer ?? data, { action: 'billing.customers.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
