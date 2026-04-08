import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimelogsAdd extends PeopleBaseCommand<typeof PeopleTimetrackerTimelogsAdd> {
  static id = 'people timetracker timelogs add'
  static summary = 'Add a new timelog'

  static flags = {
    data: Flags.string({ description: 'JSON object with timelog fields (user, jobId, workDate, hours, etc.)', required: true, char: 'd' }),
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

      const flatParams: Record<string, string> = {}
      for (const [key, value] of Object.entries(parsedData)) {
        flatParams[key] = String(value)
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'addtimelog', params: flatParams }, { action: 'timetracker.timelogs.add' })
        return
      }

      const result = await this.timetrackerRequest('addtimelog', flatParams)
      this.outputSuccess(result, { action: 'timetracker.timelogs.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
