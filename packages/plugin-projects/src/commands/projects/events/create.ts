import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsEventsCreate extends ProjectsBaseCommand<typeof ProjectsEventsCreate> {
  static id = 'projects events create'
  static summary = 'Create an event in a project'
  static examples = ['zoho projects events create --project 12345 --data \'{"title":"Sprint Review","date":"2026-04-10","hour":"10:00"}\'']

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    data: Flags.string({ description: 'JSON object with event fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const eventData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: await this.projectPath(flags.project, '/events'), body: eventData })
        return
      }
      const { data } = await this.apiClient.post(await this.projectPath(flags.project, '/events'), eventData)
      this.outputSuccess(data.events?.[0] ?? data, { action: 'events.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
