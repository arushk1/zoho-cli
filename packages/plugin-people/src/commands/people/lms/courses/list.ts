import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleLmsCoursesList extends PeopleBaseCommand<typeof PeopleLmsCoursesList> {
  static id = 'people lms courses list'
  static summary = 'List all courses'
  static examples = ['zoho people lms courses list --type 1 --state published']

  static flags = {
    type: Flags.string({ description: 'Course type (1=SelfPaced, 2=Blended, 3=EMaterial)' }),
    state: Flags.string({ description: 'Course state', options: ['drafted', 'published', 'disabled'] }),
    category: Flags.string({ description: 'Category ID' }),
    page: Flags.integer({ description: 'Start index', default: 0 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = { startIndex: String(flags.page) }
      if (flags.type) params.type = flags.type
      if (flags.state) params.state = flags.state
      if (flags.category) params.categoryId = flags.category
      const { data } = await this.apiClient.get('/api/v1/courses', { params })
      this.outputSuccess(data.courses ?? data, {
        action: 'lms.courses.list',
        hasMore: data.hasMoreRecords ?? false,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
