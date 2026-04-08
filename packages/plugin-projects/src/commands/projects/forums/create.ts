import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsForumsCreate extends ProjectsBaseCommand<typeof ProjectsForumsCreate> {
  static id = 'projects forums create'
  static summary = 'Create a new forum in a project'
  static examples = [
    'zoho projects forums create --project 12345 --data \'{"name":"General Discussion","content":"Welcome to the forum"}\'',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'JSON object with forum fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.projectPath(flags.project, '/forums')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.forums?.[0] ?? data, {
        action: 'forums.create',
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
