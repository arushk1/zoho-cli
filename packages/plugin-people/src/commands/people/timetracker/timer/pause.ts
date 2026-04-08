import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimerPause extends PeopleBaseCommand<typeof PeopleTimetrackerTimerPause> {
  static id = 'people timetracker timer pause'
  static summary = 'Pause (stop) a running timer'

  static args = {
    id: Args.string({ description: 'Time log ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'timer', timer: 'stop', timeLogId: args.id }, { action: 'timetracker.timer.pause' })
        return
      }

      const result = await this.timetrackerRequest('timer', { timer: 'stop', timeLogId: args.id })
      this.outputSuccess(result, { action: 'timetracker.timer.pause' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
