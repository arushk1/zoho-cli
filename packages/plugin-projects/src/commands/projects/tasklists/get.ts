import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasklistsGet extends ProjectsBaseCommand<typeof ProjectsTasklistsGet> {
  static id = 'projects tasklists get'
  static summary = 'Get details of a specific task list'
  static examples = ['zoho projects tasklists get 54321 --project 12345']

  static args = {
    id: Args.string({ description: 'Task list ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      // V3 API requires project-scoped path for tasklist get
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, `/tasklists/${args.id}`),
      )

      this.outputSuccess(data.tasklist ?? data, {
        action: 'tasklists.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
