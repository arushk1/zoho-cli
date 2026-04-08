import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveCompensatory extends PeopleBaseCommand<typeof PeopleLeaveCompensatory> {
  static id = 'people leave compensatory'
  static summary = 'List compensatory leave records'
  static examples = [
    'zoho people leave compensatory --from 2024-01-01 --to 2024-12-31',
  ]

  static flags = {
    from: Flags.string({ description: 'Start date', required: true }),
    to: Flags.string({ description: 'End date', required: true }),
    'data-select': Flags.string({
      description: 'Scope of data to retrieve',
      options: ['MINE', 'SUBS', 'DIRSUBS', 'ALL'],
    }),
    'approval-status': Flags.string({ description: 'Filter by approval status' }),
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
        startIndex: String(startIndex),
        limit: String(flags['per-page']),
      }

      if (flags['data-select']) params.dataSelect = flags['data-select']
      if (flags['approval-status']) params.approvalStatus = flags['approval-status']

      const { data } = await this.apiClient.get('/people/api/v2/leavetracker/compensatory/records', { params })
      this.outputSuccess(this.extractResult(data), {
        action: 'leave.compensatory',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
