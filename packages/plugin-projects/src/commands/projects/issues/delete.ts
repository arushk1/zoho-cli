import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesDelete extends ProjectsBaseCommand<typeof ProjectsIssuesDelete> {
  static id = 'projects issues delete'
  static summary = 'Delete an issue'
  static examples = ['zoho projects issues delete 12345']

  static args = {
    id: Args.string({ description: 'Issue ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'issues.delete.dryRun' })
      return
    }

    try {
      // V3 API requires project-scoped path for issue delete
      await this.apiClient.delete(
        await this.projectPath(flags.project, `/issues/${args.id}`),
      )

      this.outputSuccess({ id: args.id, deleted: true }, {
        action: 'issues.delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
