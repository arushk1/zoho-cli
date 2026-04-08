import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLmsEnroll extends PeopleBaseCommand<typeof PeopleLmsEnroll> {
  static id = 'people lms enroll'
  static summary = 'Enroll employees in a course'
  static examples = ['zoho people lms enroll 12345 --employees 100001,100002']

  static args = {
    courseId: Args.string({ description: 'Course ID', required: true }),
  }

  static flags = {
    employees: Flags.string({ description: 'Comma-separated employee record numbers (erecnos)', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const erecnos = flags.employees.split(',').map((e) => e.trim())
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/api/v1/courses/${args.courseId}/enroll`, employees: erecnos })
        return
      }
      const { data } = await this.apiClient.post(`/api/v1/courses/${args.courseId}/enroll`, null, {
        params: { erecnosList: JSON.stringify(erecnos) },
      })
      this.outputSuccess(data, { action: 'lms.enroll' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
