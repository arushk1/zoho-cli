import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesCreate extends ProjectsBaseCommand<typeof ProjectsIssuesCreate> {
  static id = 'projects issues create'
  static summary = 'Create a new issue in a project'
  static examples = [
    'zoho projects issues create --project 123 --data \'{"title":"Bug report","severity":"Major"}\'',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'Issue data as JSON', required: true }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    let body: unknown
    try {
      body = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
      this.exit(3)
      return
    }

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, payload: body }, { action: 'issues.create.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.projectPath(flags.project, '/issues'),
        body,
      )

      this.outputSuccess(data.issues?.[0] ?? data, {
        action: 'issues.create',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
