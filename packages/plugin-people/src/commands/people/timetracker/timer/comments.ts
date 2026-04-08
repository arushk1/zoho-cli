import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimerComments extends PeopleBaseCommand<typeof PeopleTimetrackerTimerComments> {
  static id = 'people timetracker timer comments'
  static summary = 'Get comments for a time log'

  static args = {
    id: Args.string({ description: 'Time log ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.timetrackerRequest('getcomment', { timeLogId: args.id })
      this.outputSuccess(result, { action: 'timetracker.timer.comments' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
