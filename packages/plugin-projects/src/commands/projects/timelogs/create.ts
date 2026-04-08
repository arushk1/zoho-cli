import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimelogsCreate extends ProjectsBaseCommand<typeof ProjectsTimelogsCreate> {
  static id = 'projects timelogs create'
  static summary = 'Create a new time log'
  static examples = [
    'zoho projects timelogs create --data \'{"date":"2024-01-15","hours":"3","task_id":"123"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'Time log data as JSON (date, hours, task_id, etc.)', required: true }),
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
      this.outputSuccess({ dryRun: true, payload: body }, { action: 'timelogs.create.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.portalPath('/timelogs'),
        body,
      )

      this.outputSuccess(data.timelogs?.[0] ?? data, {
        action: 'timelogs.create',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
