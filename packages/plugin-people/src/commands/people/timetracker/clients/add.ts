import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerClientsAdd extends PeopleBaseCommand<typeof PeopleTimetrackerClientsAdd> {
  static id = 'people timetracker clients add'
  static summary = 'Add a new timetracker client'

  static flags = {
    data: Flags.string({ description: 'JSON object with client field values', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsedData: Record<string, unknown>
      try {
        parsedData = JSON.parse(flags.data)
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
        throw error
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'P_TimesheetClient', body: parsedData }, { action: 'timetracker.clients.add' })
        return
      }

      const result = await this.formInsert('P_TimesheetClient', parsedData)
      this.outputSuccess(result, { action: 'timetracker.clients.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
