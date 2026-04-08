import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsUsersActivate extends ProjectsBaseCommand<typeof ProjectsUsersActivate> {
  static id = 'projects users activate'
  static summary = 'Activate a user in the portal'
  static examples = ['zoho projects users activate 12345']

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const path = await this.portalPath(`/users/${args.id}/activate`)

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path })
        return
      }

      const { data } = await this.apiClient.post(path, {})

      this.outputSuccess(data, {
        action: 'users.activate',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
