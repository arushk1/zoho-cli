import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerProjectsUpdate extends PeopleBaseCommand<typeof PeopleTimetrackerProjectsUpdate> {
  static id = 'people timetracker projects update'
  static summary = 'Update a timetracker project'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with project field values to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

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
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'P_TimesheetJobsList', recordId: args.id, body: parsedData }, { action: 'timetracker.projects.update' })
        return
      }

      const result = await this.formUpdate('P_TimesheetJobsList', args.id, parsedData)
      this.outputSuccess(result, { action: 'timetracker.projects.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
