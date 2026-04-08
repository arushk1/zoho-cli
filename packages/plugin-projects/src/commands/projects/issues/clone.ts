import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesClone extends ProjectsBaseCommand<typeof ProjectsIssuesClone> {
  static id = 'projects issues clone'
  static summary = 'Clone an issue'
  static examples = ['zoho projects issues clone 12345']

  static args = {
    id: Args.string({ description: 'Issue ID to clone', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    'dry-run': Flags.boolean({ description: 'Preview without cloning', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'issues.clone.dryRun' })
      return
    }

    try {
      // V3 API requires project-scoped path for issue clone
      const { data } = await this.apiClient.post(
        await this.projectPath(flags.project, `/issues/${args.id}/clone`),
      )

      this.outputSuccess(data.issues?.[0] ?? data, {
        action: 'issues.clone',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
