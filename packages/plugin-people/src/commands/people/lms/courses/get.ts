import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleLmsCoursesGet extends PeopleBaseCommand<typeof PeopleLmsCoursesGet> {
  static id = 'people lms courses get'
  static summary = 'Get course details'
  static examples = ['zoho people lms courses get 12345']

  static args = {
    id: Args.string({ description: 'Course ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const { data } = await this.apiClient.get(`/api/v1/courses/${args.id}`)
      this.outputSuccess(data, { action: 'lms.courses.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
