import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimerStart extends PeopleBaseCommand<typeof PeopleTimetrackerTimerStart> {
  static id = 'people timetracker timer start'
  static summary = 'Start a timer'

  static flags = {
    data: Flags.string({ description: 'JSON object with timer fields (user, jobId, workDate, billingStatus)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsedData: Record<string, string>
      try {
        parsedData = JSON.parse(flags.data)
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
        throw error
      }

      const flatParams: Record<string, string> = { timer: 'start' }
      for (const [key, value] of Object.entries(parsedData)) {
        flatParams[key] = String(value)
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'timer', params: flatParams }, { action: 'timetracker.timer.start' })
        return
      }

      const result = await this.timetrackerRequest('timer', flatParams)
      this.outputSuccess(result, { action: 'timetracker.timer.start' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
