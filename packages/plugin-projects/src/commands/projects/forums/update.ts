import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsForumsUpdate extends ProjectsBaseCommand<typeof ProjectsForumsUpdate> {
  static id = 'projects forums update'
  static summary = 'Update a forum in a project'
  static examples = [
    'zoho projects forums update 67890 --project 12345 --data \'{"name":"Updated Forum Name"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Forum ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'JSON object with forum fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.projectPath(flags.project, `/forums/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, body })
        return
      }

      const { data } = await this.apiClient.put(path, body)

      this.outputSuccess(data.forums?.[0] ?? data, {
        action: 'forums.update',
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
