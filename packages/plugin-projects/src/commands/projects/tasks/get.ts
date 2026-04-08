import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksGet extends ProjectsBaseCommand<typeof ProjectsTasksGet> {
  static id = 'projects tasks get'
  static summary = 'Get details of a specific task'
  static examples = [
    'zoho projects tasks get 67890 --project 12345',
  ]

  static args = {
    id: Args.string({ description: 'Task ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      // V3 API requires project-scoped path for task get
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, `/tasks/${args.id}`),
      )

      this.outputSuccess(data.task ?? data, {
        action: 'tasks.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
