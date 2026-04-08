import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerProjectsAdd extends PeopleBaseCommand<typeof PeopleTimetrackerProjectsAdd> {
  static id = 'people timetracker projects add'
  static summary = 'Add a new timetracker project'

  static flags = {
    data: Flags.string({ description: 'JSON object with project field values', required: true, char: 'd' }),
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
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'P_TimesheetJobsList', body: parsedData }, { action: 'timetracker.projects.add' })
        return
      }

      const result = await this.formInsert('P_TimesheetJobsList', parsedData)
      this.outputSuccess(result, { action: 'timetracker.projects.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
