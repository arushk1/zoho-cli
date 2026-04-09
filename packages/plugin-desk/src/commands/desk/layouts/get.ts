import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskLayoutsGet extends DeskBaseCommand<typeof DeskLayoutsGet> {
  static id = 'desk layouts get'
  static summary = 'Get a Zoho Desk layout by ID'

  static args = {
    id: Args.string({ description: 'Layout ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/layouts/${args.id}`)
      this.outputSuccess(data, { action: 'desk.layouts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
