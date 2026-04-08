import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleLmsCoursesDelete extends PeopleBaseCommand<typeof PeopleLmsCoursesDelete> {
  static id = 'people lms courses delete'
  static summary = 'Delete a course'
  static examples = ['zoho people lms courses delete 12345']

  static args = {
    id: Args.string({ description: 'Course ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/api/v1/courses/${args.id}` })
        return
      }
      const { data } = await this.apiClient.delete(`/api/v1/courses/${args.id}`)
      this.outputSuccess(data ?? { deleted: true }, { action: 'lms.courses.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
