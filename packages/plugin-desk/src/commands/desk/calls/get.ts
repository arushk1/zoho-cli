import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskCallsGet extends DeskBaseCommand<typeof DeskCallsGet> {
  static id = 'desk calls get'
  static summary = 'Get a Zoho Desk call by ID'

  static args = {
    id: Args.string({ description: 'Call ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/calls/${args.id}`)
      this.outputSuccess(data, { action: 'desk.calls.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
