import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProfilesGet extends DeskBaseCommand<typeof DeskProfilesGet> {
  static id = 'desk profiles get'
  static summary = 'Get a Zoho Desk profile by ID'

  static args = {
    id: Args.string({ description: 'Profile ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/profiles/${args.id}`)
      this.outputSuccess(data, { action: 'desk.profiles.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
