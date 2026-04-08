import { Args } from '@oclif/core'
import { ProjectsBaseCommand } from '../../projects-base-command.js'

export default class ProjectsGet extends ProjectsBaseCommand<typeof ProjectsGet> {
  static id = 'projects get'
  static summary = 'Get details of a specific project'
  static examples = ['zoho projects get 12345']

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(await this.portalPath(`/projects/${args.id}`))

      // V3 API returns the project object directly (not wrapped in { projects: [project] })
      const project = Array.isArray(data) ? data[0] : (data.projects?.[0] ?? data)

      this.outputSuccess(project, {
        action: 'projects.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
