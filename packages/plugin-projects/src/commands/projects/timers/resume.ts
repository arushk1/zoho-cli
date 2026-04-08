import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimersResume extends ProjectsBaseCommand<typeof ProjectsTimersResume> {
  static id = 'projects timers resume'
  static summary = 'Resume a paused timer'
  static examples = ['zoho projects timers resume 12345']

  static args = {
    id: Args.string({ description: 'Timer ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without resuming', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, id: args.id }, { action: 'timers.resume.dryRun' })
      return
    }

    try {
      const { data } = await this.apiClient.post(
        await this.portalPath(`/timers/${args.id}/resume`),
      )

      this.outputSuccess(data.timers?.[0] ?? data, {
        action: 'timers.resume',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
