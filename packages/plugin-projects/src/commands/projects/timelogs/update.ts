import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimelogsUpdate extends ProjectsBaseCommand<typeof ProjectsTimelogsUpdate> {
  static id = 'projects timelogs update'
  static summary = 'Update an existing time log'
  static examples = [
    'zoho projects timelogs update 12345 --data \'{"hours":"5"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Time log ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Time log data as JSON', required: true }),
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
      this.outputSuccess({ dryRun: true, id: args.id, payload: body }, { action: 'timelogs.update.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.patch(
        await this.portalPath(`/timelogs/${args.id}`),
        body,
      )

      this.outputSuccess(data.timelogs?.[0] ?? data, {
        action: 'timelogs.update',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
