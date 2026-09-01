import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingAddonsGet extends BillingBaseCommand<typeof BillingAddonsGet> {
  static id = 'billing addons get'
  static summary = 'Get an addon by addon code'

  static args = {
    id: Args.string({ description: 'Addon code', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/addons/${args.id}`)
      this.outputSuccess(data.addon ?? data, { action: 'billing.addons.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
