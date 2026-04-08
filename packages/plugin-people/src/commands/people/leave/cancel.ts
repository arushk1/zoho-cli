import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveCancel extends PeopleBaseCommand<typeof PeopleLeaveCancel> {
  static id = 'people leave cancel'
  static summary = 'Cancel a leave request'
  static examples = [
    'zoho people leave cancel 12345',
    'zoho people leave cancel 12345 --reason "Plans changed"',
  ]

  static args = {
    id: Args.string({ description: 'Leave record ID', required: true }),
  }

  static flags = {
    reason: Flags.string({ description: 'Cancellation reason' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body: Record<string, string> = {}
      if (flags.reason) body.reason = flags.reason

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path: `/api/v2/leavetracker/leaves/records/cancel/${args.id}`, body }, { action: 'leave.cancel' })
        return
      }

      const { data } = await this.apiClient.patch(`/api/v2/leavetracker/leaves/records/cancel/${args.id}`, body)
      this.outputSuccess(this.extractResult(data), { action: 'leave.cancel' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
