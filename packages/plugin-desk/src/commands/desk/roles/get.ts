import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskRolesGet extends DeskBaseCommand<typeof DeskRolesGet> {
  static id = 'desk roles get'
  static summary = 'Get a Zoho Desk role by ID'

  static args = {
    id: Args.string({ description: 'Role ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/roles/${args.id}`)
      this.outputSuccess(data, { action: 'desk.roles.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
