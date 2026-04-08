import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAnnouncementsDelete extends PeopleBaseCommand<typeof PeopleAnnouncementsDelete> {
  static id = 'people announcements delete'
  static summary = 'Delete an announcement'
  static examples = ['zoho people announcements delete 12345']

  static args = {
    id: Args.string({ description: 'Announcement ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/api/announcement/deleteAnnouncement?id=${args.id}` })
        return
      }
      const { data } = await this.apiClient.delete('/api/announcement/deleteAnnouncement', { params: { id: args.id } })
      this.outputSuccess(this.extractResult(data) ?? { deleted: true }, { action: 'announcements.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
