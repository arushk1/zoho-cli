import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../projects-base-command.js'

export default class ProjectsCreate extends ProjectsBaseCommand<typeof ProjectsCreate> {
  static id = 'projects create'
  static summary = 'Create a new project'
  static examples = [
    'zoho projects create --data \'{"name":"My Project","description":"A new project"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with project fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath('/projects')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.projects?.[0] ?? data, {
        action: 'projects.create',
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
