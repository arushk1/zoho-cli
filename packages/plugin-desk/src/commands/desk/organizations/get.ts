import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskOrganizationsGet extends DeskBaseCommand<typeof DeskOrganizationsGet> {
  static id = 'desk organizations get'
  static summary = 'Get a Zoho Desk organization by ID'

  static args = {
    id: Args.string({ description: 'Organization ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/organizations/${args.id}`)
      this.outputSuccess(data, { action: 'desk.organizations.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
