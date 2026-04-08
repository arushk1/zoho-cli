import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleLmsCoursesCreate extends PeopleBaseCommand<typeof PeopleLmsCoursesCreate> {
  static id = 'people lms courses create'
  static summary = 'Create a new course'
  static examples = ['zoho people lms courses create --data \'{"name":"Onboarding 101","type":1}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with course fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const courseData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/api/v1/courses', body: courseData })
        return
      }
      const { data } = await this.apiClient.post('/api/v1/courses', courseData)
      this.outputSuccess(data, { action: 'lms.courses.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
