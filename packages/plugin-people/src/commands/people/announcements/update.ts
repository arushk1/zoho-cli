import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAnnouncementsUpdate extends PeopleBaseCommand<typeof PeopleAnnouncementsUpdate> {
  static id = 'people announcements update'
  static summary = 'Update an announcement'
  static examples = ['zoho people announcements update 12345 --data \'{"title":"Updated Title"}\'']

  static args = {
    id: Args.string({ description: 'Announcement ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const updateData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/people/api/announcement/updateAnnouncement', body: { id: args.id, ...updateData } })
        return
      }
      const params = new URLSearchParams()
      params.append('id', args.id)
      for (const [key, value] of Object.entries(updateData)) {
        params.append(key, String(value))
      }
      const { data } = await this.apiClient.post('/people/api/announcement/updateAnnouncement', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      this.outputSuccess(this.extractResult(data), { action: 'announcements.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
