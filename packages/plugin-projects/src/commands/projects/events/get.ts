import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsEventsGet extends ProjectsBaseCommand<typeof ProjectsEventsGet> {
  static id = 'projects events get'
  static summary = 'Get event details'
  static examples = ['zoho projects events get 67890 --project 12345']

  static args = {
    id: Args.string({ description: 'Event ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const { data } = await this.apiClient.get(await this.projectPath(flags.project, `/events/${args.id}`))
      this.outputSuccess(data.events?.[0] ?? data, { action: 'events.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
