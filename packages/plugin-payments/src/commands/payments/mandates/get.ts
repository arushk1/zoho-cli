import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayMandatesGet extends PaymentsBaseCommand<typeof PayMandatesGet> {
  static id = 'payments mandates get'
  static summary = 'Get a mandate'

  static args = {
    id: Args.string({ description: 'Mandate ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/mandates/${args.id}`)
      this.outputSuccess(data.mandate ?? data, { action: 'payments.mandates.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
