import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesUpdate extends ProjectsBaseCommand<typeof ProjectsIssuesUpdate> {
  static id = 'projects issues update'
  static summary = 'Update an existing issue'
  static examples = [
    'zoho projects issues update 12345 --data \'{"title":"Updated title"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Issue ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID (required by V3 API)', required: true, char: 'p' }),
    data: Flags.string({ description: 'Issue data as JSON', required: true }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    let body: unknown
    try {
      body = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
      this.exit(3)
      return
    }

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id, payload: body }, { action: 'issues.update.dryRun' })
      return
    }

    try {
      // V3 API requires project-scoped path for issue update
      const { data } = await this.apiClient.patch(
        await this.projectPath(flags.project, `/issues/${args.id}`),
        body,
      )

      this.outputSuccess(data.issues?.[0] ?? data, {
        action: 'issues.update',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
