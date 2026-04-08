import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleCasesCategories extends PeopleBaseCommand<typeof PeopleCasesCategories> {
  static id = 'people cases categories'
  static summary = 'List HR case categories'
  static examples = ['zoho people cases categories']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/api/hrcases/listCategory')
      this.outputSuccess(this.extractResult(data), { action: 'cases.categories' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
