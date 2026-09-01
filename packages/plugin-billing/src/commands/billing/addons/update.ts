import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingAddonsUpdate extends BillingBaseCommand<typeof BillingAddonsUpdate> {
  static id = 'billing addons update'
  static summary = 'Update an addon'

  static args = {
    id: Args.string({ description: 'Addon code', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/addons/${args.id}`, body })
        return
      }
      const data = await this.billingPut(`/addons/${args.id}`, body)
      this.outputSuccess(data.addon ?? data, { action: 'billing.addons.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
