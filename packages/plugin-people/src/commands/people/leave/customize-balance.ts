import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveCustomizeBalance extends PeopleBaseCommand<typeof PeopleLeaveCustomizeBalance> {
  static id = 'people leave customize-balance'
  static summary = 'Customize leave balance for an employee'
  static examples = [
    'zoho people leave customize-balance 12345 --data \'{"leaveType":"Casual Leave","balance":"10"}\'',
  ]

  static args = {
    erecno: Args.string({ description: 'Employee record number', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with balance data', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/api/v2/leavetracker/settings/customize-balance/${args.erecno}`, body: parsedData }, { action: 'leave.customize-balance' })
        return
      }

      const params = new URLSearchParams()
      params.append('balanceData', JSON.stringify(parsedData))

      const { data } = await this.apiClient.post(
        `/api/v2/leavetracker/settings/customize-balance/${args.erecno}`,
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      this.outputSuccess(this.extractResult(data), { action: 'leave.customize-balance' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
