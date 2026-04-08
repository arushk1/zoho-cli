import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveBalance extends PeopleBaseCommand<typeof PeopleLeaveBalance> {
  static id = 'people leave balance'
  static summary = 'Add leave balance'
  static examples = [
    'zoho people leave balance --data \'[{"employeeId":"12345","leaveType":"Casual Leave","balance":"5"}]\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON array of balance data', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsedData: unknown
      try {
        parsedData = JSON.parse(flags.data)
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
        throw error
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/api/leave/addBalance', body: parsedData }, { action: 'leave.balance' })
        return
      }

      const params = new URLSearchParams()
      params.append('balanceData', JSON.stringify(parsedData))

      const { data } = await this.apiClient.post('/api/leave/addBalance', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      this.outputSuccess(this.extractResult(data), { action: 'leave.balance' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
