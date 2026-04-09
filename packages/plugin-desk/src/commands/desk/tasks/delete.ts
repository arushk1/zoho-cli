import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksDelete extends DeskBaseCommand<typeof DeskTasksDelete> {
  static id = 'desk tasks delete'
  static summary = 'Delete a Zoho Desk task by ID'

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/tasks/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.tasks.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
