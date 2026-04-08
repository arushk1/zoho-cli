import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimersStart extends ProjectsBaseCommand<typeof ProjectsTimersStart> {
  static id = 'projects timers start'
  static summary = 'Start a new timer'
  static examples = [
    'zoho projects timers start --data \'{"task_id":"123","notes":"Working on feature"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'Timer data as JSON (task_id, notes, etc.)', required: true }),
    'dry-run': Flags.boolean({ description: 'Preview without starting', default: false }),
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
      this.outputSuccess({ dryRun: true, payload: body }, { action: 'timers.start.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.portalPath('/timers'),
        body,
      )

      this.outputSuccess(data.timers?.[0] ?? data, {
        action: 'timers.start',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
