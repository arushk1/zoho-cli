import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAnnouncementsAdd extends PeopleBaseCommand<typeof PeopleAnnouncementsAdd> {
  static id = 'people announcements add'
  static summary = 'Add an announcement'
  static examples = ['zoho people announcements add --data \'{"title":"Holiday Notice","description":"Office closed on Friday"}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with announcement fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const announcementData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', path: '/people/api/announcement/addAnnouncement', body: announcementData })
        return
      }
      const params: Record<string, string> = {}
      for (const [key, value] of Object.entries(announcementData)) {
        params[key] = String(value)
      }
      const { data } = await this.apiClient.get('/people/api/announcement/addAnnouncement', { params })
      this.outputSuccess(this.extractResult(data), { action: 'announcements.add' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
