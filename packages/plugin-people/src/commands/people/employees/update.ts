import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleEmployeesUpdate extends PeopleBaseCommand<typeof PeopleEmployeesUpdate> {
  static id = 'people employees update'
  static summary = 'Update an existing employee record'
  static examples = [
    'zoho people employees update 12345 --data \'{"Department":"Engineering"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Employee record ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with employee field values', required: true, char: 'd' }),
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
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'employee', recordId: args.id, body: parsedData }, { action: 'employees.update' })
        return
      }

      const result = await this.formUpdate('employee', args.id, parsedData)
      this.outputSuccess(result, { action: 'employees.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
