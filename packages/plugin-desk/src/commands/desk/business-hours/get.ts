import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskBusinessHoursGet extends DeskBaseCommand<typeof DeskBusinessHoursGet> {
  static id = 'desk business-hours get'
  static summary = 'Get Zoho Desk business hours by ID'

  static args = {
    id: Args.string({ description: 'Business hours ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/businessHours/${args.id}`)
      this.outputSuccess(data, { action: 'desk.business-hours.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
