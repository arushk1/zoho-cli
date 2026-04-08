import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTeamsCreate extends ProjectsBaseCommand<typeof ProjectsTeamsCreate> {
  static id = 'projects teams create'
  static summary = 'Create a new team'
  static examples = [
    'zoho projects teams create --data \'{"name":"Engineering","members":[{"id":"111"}]}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with team fields (name, members)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = JSON.parse(flags.data)
      const path = await this.portalPath('/teams')

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.teams?.[0] ?? data, {
        action: 'teams.create',
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
