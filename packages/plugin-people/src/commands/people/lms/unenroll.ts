import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLmsUnenroll extends PeopleBaseCommand<typeof PeopleLmsUnenroll> {
  static id = 'people lms unenroll'
  static summary = 'Unenroll employees from a course batch'
  static examples = ['zoho people lms unenroll 12345 --batch 67890 --employees 100001,100002']

  static args = {
    courseId: Args.string({ description: 'Course ID', required: true }),
  }

  static flags = {
    batch: Flags.string({ description: 'Batch ID', required: true }),
    employees: Flags.string({ description: 'Comma-separated employee record numbers (erecnos)', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const erecnos = flags.employees.split(',').map((e) => e.trim())
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/api/v1/courses/${args.courseId}/batches/${flags.batch}/unenroll`, employees: erecnos })
        return
      }
      const { data } = await this.apiClient.post(`/api/v1/courses/${args.courseId}/batches/${flags.batch}/unenroll`, null, {
        params: { erecnosList: JSON.stringify(erecnos) },
      })
      this.outputSuccess(data, { action: 'lms.unenroll' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
