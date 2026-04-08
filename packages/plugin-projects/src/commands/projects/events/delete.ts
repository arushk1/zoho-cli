import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsEventsDelete extends ProjectsBaseCommand<typeof ProjectsEventsDelete> {
  static id = 'projects events delete'
  static summary = 'Delete an event'
  static examples = ['zoho projects events delete 67890 --project 12345']

  static args = {
    id: Args.string({ description: 'Event ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: await this.projectPath(flags.project, `/events/${args.id}`) })
        return
      }
      const { data } = await this.apiClient.delete(await this.projectPath(flags.project, `/events/${args.id}`))
      this.outputSuccess(data ?? { deleted: true }, { action: 'events.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
