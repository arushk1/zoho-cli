import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimesheetsCreate extends PeopleBaseCommand<typeof PeopleTimetrackerTimesheetsCreate> {
  static id = 'people timetracker timesheets create'
  static summary = 'Create a new timesheet'

  static flags = {
    data: Flags.string({ description: 'JSON object with timesheet fields', required: true, char: 'd' }),
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
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'createtimesheet', params: flatParams }, { action: 'timetracker.timesheets.create' })
        return
      }

      const result = await this.timetrackerRequest('createtimesheet', flatParams)
      this.outputSuccess(result, { action: 'timetracker.timesheets.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
