import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFormsGet extends PeopleBaseCommand<typeof PeopleFormsGet> {
  static id = 'people forms get'
  static summary = 'Get a single form record by ID'
  static examples = [
    'zoho people forms get employee --record-id 12345',
  ]

  static args = {
    form: Args.string({ description: 'Form link name', required: true }),
  }

  static flags = {
    'record-id': Flags.string({ description: 'Record ID to retrieve', required: true }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const result = await this.formGetById(args.form, flags['record-id'])
      this.outputSuccess(result, { action: 'forms.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
