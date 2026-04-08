import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTeamsDelete extends ProjectsBaseCommand<typeof ProjectsTeamsDelete> {
  static id = 'projects teams delete'
  static summary = 'Delete a team'
  static examples = ['zoho projects teams delete 12345']

  static args = {
    id: Args.string({ description: 'Team ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const path = await this.portalPath(`/teams/${args.id}`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path })
        return
      }

      const { data } = await this.apiClient.delete(path)

      this.outputSuccess(data ?? { deleted: true }, {
        action: 'teams.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
