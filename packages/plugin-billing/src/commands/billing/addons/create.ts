import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingAddonsCreate extends BillingBaseCommand<typeof BillingAddonsCreate> {
  static id = 'billing addons create'
  static summary = 'Create an addon'

  static flags = {
    data: Flags.string({ description: 'JSON object with addon fields (addon_code, name, price_brackets, type, product_id, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/addons', body })
        return
      }
      const data = await this.billingPost('/addons', body)
      this.outputSuccess(data.addon ?? data, { action: 'billing.addons.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
