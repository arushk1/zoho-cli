import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasklistsCreate extends ProjectsBaseCommand<typeof ProjectsTasklistsCreate> {
  static id = 'projects tasklists create'
  static summary = 'Create a new task list in a project'
  static examples = [
    'zoho projects tasklists create --project 12345 --data \'{"name":"Sprint 1"}\'',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'JSON object with task list fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.projectPath(flags.project, '/tasklists')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.tasklists?.[0] ?? data, {
        action: 'tasklists.create',
      })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
