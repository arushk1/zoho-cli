import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskCallsDelete extends DeskBaseCommand<typeof DeskCallsDelete> {
  static id = 'desk calls delete'
  static summary = 'Delete a Zoho Desk call by ID'

  static args = {
    id: Args.string({ description: 'Call ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/calls/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.calls.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
