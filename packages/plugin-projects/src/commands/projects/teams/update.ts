import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTeamsUpdate extends ProjectsBaseCommand<typeof ProjectsTeamsUpdate> {
  static id = 'projects teams update'
  static summary = 'Update a team'
  static examples = [
    'zoho projects teams update 12345 --data \'{"name":"Updated Team Name"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Team ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with team fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath(`/teams/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, body })
        return
      }

      const { data } = await this.apiClient.put(path, body)

      this.outputSuccess(data.teams?.[0] ?? data, {
        action: 'teams.update',
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
