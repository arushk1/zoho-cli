import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFormsInsert extends PeopleBaseCommand<typeof PeopleFormsInsert> {
  static id = 'people forms insert'
  static summary = 'Insert a record into a form'
  static examples = [
    'zoho people forms insert employee --data \'{"First_Name":"John","Last_Name":"Doe"}\'',
  ]

  static args = {
    form: Args.string({ description: 'Form link name', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with form field values', required: true, char: 'd' }),
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
        this.outputSuccess({ dryRun: true, method: 'POST', form: args.form, body: parsedData }, { action: 'forms.insert' })
        return
      }

      const result = await this.formInsert(args.form, parsedData)
      this.outputSuccess(result, { action: 'forms.insert' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
