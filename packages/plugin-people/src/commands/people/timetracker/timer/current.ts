import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimerCurrent extends PeopleBaseCommand<typeof PeopleTimetrackerTimerCurrent> {
  static id = 'people timetracker timer current'
  static summary = 'Get the currently running timer'

  async run(): Promise<void> {
    try {
      const result = await this.timetrackerRequest('getcurrentlyrunningtimer', {})
      this.outputSuccess(result, { action: 'timetracker.timer.current' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
