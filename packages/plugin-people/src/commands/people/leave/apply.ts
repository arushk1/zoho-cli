import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveApply extends PeopleBaseCommand<typeof PeopleLeaveApply> {
  static id = 'people leave apply'
  static summary = 'Apply for leave'
  static examples = [
    'zoho people leave apply --data \'{"Leavetype":"Casual Leave","From":"2024-03-01","To":"2024-03-02"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with leave details', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsedData: Record<string, unknown>
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
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'leave', body: parsedData }, { action: 'leave.apply' })
        return
      }

      const result = await this.formInsert('leave', parsedData)
      this.outputSuccess(result, { action: 'leave.apply' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
