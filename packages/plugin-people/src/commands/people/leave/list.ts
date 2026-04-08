import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveList extends PeopleBaseCommand<typeof PeopleLeaveList> {
  static id = 'people leave list'
  static summary = 'List leave records'
  static examples = [
    'zoho people leave list --from 2024-01-01 --to 2024-12-31',
    'zoho people leave list --from 2024-01-01 --to 2024-03-31 --data-select ALL --approval-status approved',
  ]

  static flags = {
    from: Flags.string({ description: 'Start date (e.g. 2024-01-01)', required: true }),
    to: Flags.string({ description: 'End date (e.g. 2024-12-31)', required: true }),
    'data-select': Flags.string({
      description: 'Scope of data to retrieve',
      options: ['MINE', 'SUBS', 'DIRSUBS', 'ALL'],
      default: 'MINE',
    }),
    'approval-status': Flags.string({ description: 'Filter by approval status' }),
    employee: Flags.string({ description: 'Filter by employee ID' }),
    'leave-type': Flags.string({ description: 'Filter by leave type' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const startIndex = (flags.page - 1) * flags['per-page']
      const params: Record<string, string> = {
        from: flags.from,
        to: flags.to,
        dataSelect: flags['data-select']!,
        startIndex: String(startIndex),
        limit: String(flags['per-page']),
      }

      if (flags['approval-status']) params.approvalStatus = flags['approval-status']
      if (flags.employee) params.employee = flags.employee
      if (flags['leave-type']) params.leavetype = flags['leave-type']

      const { data } = await this.apiClient.get('/api/v2/leavetracker/leaves/records', { params })
      this.outputSuccess(this.extractResult(data), {
        action: 'leave.list',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
