import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimersPause extends ProjectsBaseCommand<typeof ProjectsTimersPause> {
  static id = 'projects timers pause'
  static summary = 'Pause a running timer'
  static examples = ['zoho projects timers pause 12345']

  static args = {
    id: Args.string({ description: 'Timer ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without pausing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'timers.pause.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.portalPath(`/timers/${args.id}/pause`),
      )

      this.outputSuccess(data.timers?.[0] ?? data, {
        action: 'timers.pause',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
