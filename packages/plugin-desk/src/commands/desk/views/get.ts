import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskViewsGet extends DeskBaseCommand<typeof DeskViewsGet> {
  static id = 'desk views get'
  static summary = 'Get a Zoho Desk view by ID'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/views/${args.id}`)
      this.outputSuccess(data, { action: 'desk.views.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
