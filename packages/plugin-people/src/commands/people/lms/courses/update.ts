import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleLmsCoursesUpdate extends PeopleBaseCommand<typeof PeopleLmsCoursesUpdate> {
  static id = 'people lms courses update'
  static summary = 'Update a course'
  static examples = ['zoho people lms courses update 12345 --data \'{"name":"Updated Course Name"}\'']

  static args = {
    id: Args.string({ description: 'Course ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const courseData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path: `/api/v1/courses/${args.id}`, body: courseData })
        return
      }
      const { data } = await this.apiClient.patch(`/api/v1/courses/${args.id}`, courseData)
      this.outputSuccess(data, { action: 'lms.courses.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
