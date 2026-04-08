import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFormsList extends PeopleBaseCommand<typeof PeopleFormsList> {
  static id = 'people forms list'
  static summary = 'List all forms in Zoho People'
  static examples = ['zoho people forms list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/people/api/forms')
      this.outputSuccess(this.extractResult(data), { action: 'forms.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
