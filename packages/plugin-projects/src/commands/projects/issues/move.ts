import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesMove extends ProjectsBaseCommand<typeof ProjectsIssuesMove> {
  static id = 'projects issues move'
  static summary = 'Move an issue to another project'
  static examples = [
    'zoho projects issues move 12345 --data \'{"project_id":"67890"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Issue ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Source project ID (required by V3 API)', required: true, char: 'p' }),
    data: Flags.string({ description: 'Move data as JSON (must include target project)', required: true }),
    'dry-run': Flags.boolean({ description: 'Preview without moving', default: false }),
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
      this.outputSuccess({ dryRun: true, id: args.id, payload: body }, { action: 'issues.move.dryRun' })
      return
    }

    try {
      // V3 API requires project-scoped path for issue move
      const { data } = await this.apiClient.post(
        await this.projectPath(flags.project, `/issues/${args.id}/move`),
        body,
      )

      this.outputSuccess(data.issues?.[0] ?? data, {
        action: 'issues.move',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
