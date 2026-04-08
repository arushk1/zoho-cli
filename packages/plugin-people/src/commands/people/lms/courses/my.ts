import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleLmsCoursesMy extends PeopleBaseCommand<typeof PeopleLmsCoursesMy> {
  static id = 'people lms courses my'
  static summary = 'List my enrolled courses'
  static examples = ['zoho people lms courses my']

  static flags = {
    page: Flags.integer({ description: 'Start index', default: 0 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const { data } = await this.apiClient.get('/api/v1/courses/mycourses', {
        params: { startIndex: String(flags.page) },
      })
      this.outputSuccess(data.courses ?? data, {
        action: 'lms.courses.my',
        hasMore: data.hasMoreRecords ?? false,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
