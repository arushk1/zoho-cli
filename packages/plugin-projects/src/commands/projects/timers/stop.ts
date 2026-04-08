import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimersStop extends ProjectsBaseCommand<typeof ProjectsTimersStop> {
  static id = 'projects timers stop'
  static summary = 'Stop a running timer'
  static examples = ['zoho projects timers stop 12345']

  static args = {
    id: Args.string({ description: 'Timer ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without stopping', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'timers.stop.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.portalPath(`/timers/${args.id}/stop`),
      )

      this.outputSuccess(data.timers?.[0] ?? data, {
        action: 'timers.stop',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
