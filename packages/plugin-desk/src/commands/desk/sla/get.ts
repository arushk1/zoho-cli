import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskSlaGet extends DeskBaseCommand<typeof DeskSlaGet> {
  static id = 'desk sla get'
  static summary = 'Get a Zoho Desk SLA rule by ID'

  static args = {
    id: Args.string({ description: 'SLA rule ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/slaRules/${args.id}`)
      this.outputSuccess(data, { action: 'desk.sla.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
