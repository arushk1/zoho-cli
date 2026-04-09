import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksGet extends DeskBaseCommand<typeof DeskTasksGet> {
  static id = 'desk tasks get'
  static summary = 'Get a Zoho Desk task by ID'

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/tasks/${args.id}`)
      this.outputSuccess(data, { action: 'desk.tasks.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
