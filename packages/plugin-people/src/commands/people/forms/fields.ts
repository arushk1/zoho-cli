import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFormsFields extends PeopleBaseCommand<typeof PeopleFormsFields> {
  static id = 'people forms fields'
  static summary = 'List fields (components) of a form'
  static examples = ['zoho people forms fields employee']

  static args = {
    form: Args.string({ description: 'Form link name', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/people/api/forms/${args.form}/components`)
      this.outputSuccess(this.extractResult(data), { action: 'forms.fields' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
