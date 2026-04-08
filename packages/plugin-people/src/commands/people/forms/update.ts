import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFormsUpdate extends PeopleBaseCommand<typeof PeopleFormsUpdate> {
  static id = 'people forms update'
  static summary = 'Update a record in a form'
  static examples = [
    'zoho people forms update employee --record-id 12345 --data \'{"Last_Name":"Smith"}\'',
  ]

  static args = {
    form: Args.string({ description: 'Form link name', required: true }),
  }

  static flags = {
    'record-id': Flags.string({ description: 'Record ID to update', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'POST', form: args.form, recordId: flags['record-id'], body: parsedData }, { action: 'forms.update' })
        return
      }

      const result = await this.formUpdate(args.form, flags['record-id'], parsedData)
      this.outputSuccess(result, { action: 'forms.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
