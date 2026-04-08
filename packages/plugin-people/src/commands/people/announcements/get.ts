import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAnnouncementsGet extends PeopleBaseCommand<typeof PeopleAnnouncementsGet> {
  static id = 'people announcements get'
  static summary = 'Get an announcement by ID'
  static examples = ['zoho people announcements get 12345']

  static args = {
    id: Args.string({ description: 'Announcement ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const { data } = await this.apiClient.get('/people/api/announcement/getAnnouncementByID', { params: { id: args.id } })
      this.outputSuccess(this.extractResult(data), { action: 'announcements.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
