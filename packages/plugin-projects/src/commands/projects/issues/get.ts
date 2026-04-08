import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesGet extends ProjectsBaseCommand<typeof ProjectsIssuesGet> {
  static id = 'projects issues get'
  static summary = 'Get a specific issue by ID'
  static examples = ['zoho projects issues get 12345 --project 67890']

  static args = {
    id: Args.string({ description: 'Issue ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      // V3 API requires project-scoped path for issue get
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, `/issues/${args.id}`),
      )

      this.outputSuccess(data.issue ?? data.issues?.[0] ?? data, {
        action: 'issues.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
