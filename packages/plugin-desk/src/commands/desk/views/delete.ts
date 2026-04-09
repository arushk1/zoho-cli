import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskViewsDelete extends DeskBaseCommand<typeof DeskViewsDelete> {
  static id = 'desk views delete'
  static summary = 'Delete a Zoho Desk view'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/views/${args.id}`)
      this.outputSuccess(null, { action: 'desk.views.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
