import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveEncashmentReport extends PeopleBaseCommand<typeof PeopleLeaveEncashmentReport> {
  static id = 'people leave encashment-report'
  static summary = 'Get leave encashment report'
  static examples = [
    'zoho people leave encashment-report --pay-period-id PP001 --from 2024-01-01 --to 2024-12-31',
  ]

  static flags = {
    'pay-period-id': Flags.string({ description: 'Pay period ID', required: true }),
    from: Flags.string({ description: 'Start date', required: true }),
    to: Flags.string({ description: 'End date', required: true }),
    employee: Flags.string({ description: 'Employee ID filter' }),
    page: Flags.integer({ description: 'Page number' }),
    'per-page': Flags.integer({ description: 'Records per page', default: 30 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        payPeriodId: flags['pay-period-id'],
        from: flags.from,
        to: flags.to,
        limit: String(flags['per-page']),
      }

      if (flags.employee) params.employee = flags.employee
      if (flags.page !== undefined) {
        const startIndex = (flags.page - 1) * flags['per-page']
        params.startIndex = String(startIndex)
      }

      const { data } = await this.apiClient.get('/people/api/v2/leavetracker/reports/encashment', { params })
      this.outputSuccess(this.extractResult(data), {
        action: 'leave.encashment-report',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
