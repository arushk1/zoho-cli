import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksGet extends DeskBaseCommand<typeof DeskTasksGet> {
  static id = 'desk tasks get'
  static summary = 'Get a Zoho Desk task by ID'

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  static flags = {
    fields: Flags.string({ description: 'Comma-separated list of fields to return' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.fields) params.fields = flags.fields

      const data = await this.deskGet(`/tasks/${args.id}`, params)
      this.outputSuccess(data, { action: 'desk.tasks.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
