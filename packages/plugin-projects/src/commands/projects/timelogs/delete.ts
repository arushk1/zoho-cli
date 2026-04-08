import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimelogsDelete extends ProjectsBaseCommand<typeof ProjectsTimelogsDelete> {
  static id = 'projects timelogs delete'
  static summary = 'Delete a time log'
  static examples = ['zoho projects timelogs delete 12345']

  static args = {
    id: Args.string({ description: 'Time log ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'timelogs.delete.dryRun' })
      return
    }

    try {
      await this.apiClient.delete(
        await this.portalPath(`/timelogs/${args.id}`),
      )

      this.outputSuccess({ id: args.id, deleted: true }, {
        action: 'timelogs.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
