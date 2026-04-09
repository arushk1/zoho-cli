import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTeamsGet extends DeskBaseCommand<typeof DeskTeamsGet> {
  static id = 'desk teams get'
  static summary = 'Get a Zoho Desk team by ID'

  static args = {
    id: Args.string({ description: 'Team ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/teams/${args.id}`)
      this.outputSuccess(data, { action: 'desk.teams.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
