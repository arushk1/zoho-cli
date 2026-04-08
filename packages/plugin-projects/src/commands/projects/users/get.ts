import { Args } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsUsersGet extends ProjectsBaseCommand<typeof ProjectsUsersGet> {
  static id = 'projects users get'
  static summary = 'Get details of a specific user'
  static examples = ['zoho projects users get 12345']

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(await this.portalPath(`/users/${args.id}`))

      this.outputSuccess(data.users?.[0] ?? data, {
        action: 'users.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
