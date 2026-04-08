import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLmsCategories extends PeopleBaseCommand<typeof PeopleLmsCategories> {
  static id = 'people lms categories'
  static summary = 'List LMS course categories'
  static examples = ['zoho people lms categories']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/api/v1/categories')
      this.outputSuccess(data.categories ?? data, { action: 'lms.categories' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
