import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleEmployeesAdd extends PeopleBaseCommand<typeof PeopleEmployeesAdd> {
  static id = 'people employees add'
  static summary = 'Add a new employee record'
  static examples = [
    'zoho people employees add --data \'{"First_Name":"John","Last_Name":"Doe","Email":"john@example.com"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with employee field values', required: true, char: 'd' }),
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
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'employee', body: parsedData }, { action: 'employees.add' })
        return
      }

      const result = await this.formInsert('employee', parsedData)
      this.outputSuccess(result, { action: 'employees.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
