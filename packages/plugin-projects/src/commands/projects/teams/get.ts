import { Args } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTeamsGet extends ProjectsBaseCommand<typeof ProjectsTeamsGet> {
  static id = 'projects teams get'
  static summary = 'Get details of a specific team'
  static examples = ['zoho projects teams get 12345']

  static args = {
    id: Args.string({ description: 'Team ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(await this.portalPath(`/teams/${args.id}`))

      this.outputSuccess(data.teams?.[0] ?? data, {
        action: 'teams.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
