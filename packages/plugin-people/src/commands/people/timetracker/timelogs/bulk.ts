import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimelogsBulk extends PeopleBaseCommand<typeof PeopleTimetrackerTimelogsBulk> {
  static id = 'people timetracker timelogs bulk'
  static summary = 'Bulk add/update timelogs (up to 100 at a time)'

  static flags = {
    data: Flags.string({ description: 'JSON array of timelog objects (max 100)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsedData: unknown[]
      try {
        parsedData = JSON.parse(flags.data)
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
        throw error
      }

      if (!Array.isArray(parsedData)) {
        this.outputError('INVALID_DATA', 'Data must be a JSON array of timelog objects')
        this.exit(3)
      }

      if (parsedData.length > 100) {
        this.outputError('LIMIT_EXCEEDED', 'Maximum 100 timelogs per bulk request')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', endpoint: 'addupdatetimelogs', count: parsedData.length, body: parsedData }, { action: 'timetracker.timelogs.bulk' })
        return
      }

      const params = new URLSearchParams()
      params.append('timelogs', JSON.stringify(parsedData))

      const { data: resp } = await this.apiClient.post(
        '/people/api/timetracker/addupdatetimelogs',
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      const result = this.extractResult(resp)
      this.outputSuccess(result, { action: 'timetracker.timelogs.bulk' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
