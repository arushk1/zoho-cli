import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPhasesUpdate extends ProjectsBaseCommand<typeof ProjectsPhasesUpdate> {
  static id = 'projects phases update'
  static summary = 'Update an existing phase'
  static examples = [
    'zoho projects phases update 12345 --project 67890 --data \'{"name":"Updated Phase"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Phase ID', required: true }),
  }

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    data: Flags.string({ description: 'Phase data as JSON', required: true }),
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
      this.outputSuccess({ dryRun: true, id: args.id, payload: body }, { action: 'phases.update.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.patch(
        await this.projectPath(flags.project, `/phases/${args.id}`),
        body,
      )

      this.outputSuccess(data.phases?.[0] ?? data, {
        action: 'phases.update',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
