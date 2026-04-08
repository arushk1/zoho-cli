import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../projects-base-command.js'

export default class ProjectsUpdate extends ProjectsBaseCommand<typeof ProjectsUpdate> {
  static id = 'projects update'
  static summary = 'Update an existing project'
  static examples = [
    'zoho projects update 12345 --data \'{"name":"Updated Project Name"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with project fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath(`/projects/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, body })
        return
      }

      const { data } = await this.apiClient.put(path, body)

      this.outputSuccess(data.projects?.[0] ?? data, {
        action: 'projects.update',
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
