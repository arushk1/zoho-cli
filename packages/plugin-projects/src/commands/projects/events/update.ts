import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsEventsUpdate extends ProjectsBaseCommand<typeof ProjectsEventsUpdate> {
  static id = 'projects events update'
  static summary = 'Update an event'
  static examples = ['zoho projects events update 67890 --project 12345 --data \'{"title":"Updated Title"}\'']

  static args = {
    id: Args.string({ description: 'Event ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const eventData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path: await this.projectPath(flags.project, `/events/${args.id}`), body: eventData })
        return
      }
      const { data } = await this.apiClient.patch(await this.projectPath(flags.project, `/events/${args.id}`), eventData)
      this.outputSuccess(data.events?.[0] ?? data, { action: 'events.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
