import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveGet extends PeopleBaseCommand<typeof PeopleLeaveGet> {
  static id = 'people leave get'
  static summary = 'Get a leave record by ID'
  static examples = [
    'zoho people leave get 12345',
  ]

  static args = {
    id: Args.string({ description: 'Leave record ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.formGetById('leave', args.id)
      this.outputSuccess(result, { action: 'leave.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
