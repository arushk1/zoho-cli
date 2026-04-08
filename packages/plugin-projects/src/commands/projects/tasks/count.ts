import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksCount extends ProjectsBaseCommand<typeof ProjectsTasksCount> {
  static id = 'projects tasks count'
  static summary = 'Get task count for a project'
  static examples = ['zoho projects tasks count --project 12345']

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, '/tasks/count'),
      )

      this.outputSuccess(data, {
        action: 'tasks.count',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
