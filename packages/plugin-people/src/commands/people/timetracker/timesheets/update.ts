import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimesheetsUpdate extends PeopleBaseCommand<typeof PeopleTimetrackerTimesheetsUpdate> {
  static id = 'people timetracker timesheets update'
  static summary = 'Update an existing timesheet'

  static args = {
    id: Args.string({ description: 'Timesheet ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with timesheet fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

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

      const flatParams: Record<string, string> = { timesheetId: args.id }
      for (const [key, value] of Object.entries(parsedData)) {
        flatParams[key] = String(value)
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'modifytimesheet', params: flatParams }, { action: 'timetracker.timesheets.update' })
        return
      }

      const result = await this.timetrackerRequest('modifytimesheet', flatParams)
      this.outputSuccess(result, { action: 'timetracker.timesheets.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
