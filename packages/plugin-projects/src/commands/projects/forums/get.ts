import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsForumsGet extends ProjectsBaseCommand<typeof ProjectsForumsGet> {
  static id = 'projects forums get'
  static summary = 'Get details of a specific forum'
  static examples = ['zoho projects forums get 67890 --project 12345']

  static args = {
    id: Args.string({ description: 'Forum ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const { data } = await this.apiClient.get(await this.projectPath(flags.project, `/forums/${args.id}`))

      this.outputSuccess(data.forums?.[0] ?? data, {
        action: 'forums.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
