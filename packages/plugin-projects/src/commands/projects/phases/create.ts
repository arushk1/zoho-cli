import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPhasesCreate extends ProjectsBaseCommand<typeof ProjectsPhasesCreate> {
  static id = 'projects phases create'
  static summary = 'Create a new phase in a project'
  static examples = [
    'zoho projects phases create --project 123 --data \'{"name":"Design"}\'',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'Phase data as JSON', required: true }),
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
      this.outputSuccess({ dryRun: true, payload: body }, { action: 'phases.create.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.projectPath(flags.project, '/phases'),
        body,
      )

      this.outputSuccess(data.phases?.[0] ?? data, {
        action: 'phases.create',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
