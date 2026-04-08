import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsUsersDeactivate extends ProjectsBaseCommand<typeof ProjectsUsersDeactivate> {
  static id = 'projects users deactivate'
  static summary = 'Deactivate a user in the portal'
  static examples = ['zoho projects users deactivate 12345']

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const path = await this.portalPath(`/users/${args.id}/deactivate`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path })
        return
      }

      const { data } = await this.apiClient.post(path, {})

      this.outputSuccess(data, {
        action: 'users.deactivate',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
