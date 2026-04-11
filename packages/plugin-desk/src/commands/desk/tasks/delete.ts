import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksDelete extends DeskBaseCommand<typeof DeskTasksDelete> {
  static id = 'desk tasks delete'
  static summary = 'Delete a Zoho Desk task by ID'

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.tasks.delete.dry-run' })
        return
      }
      await this.deskDelete(`/tasks/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.tasks.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
