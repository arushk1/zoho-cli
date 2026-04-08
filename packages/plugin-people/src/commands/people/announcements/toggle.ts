import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAnnouncementsToggle extends PeopleBaseCommand<typeof PeopleAnnouncementsToggle> {
  static id = 'people announcements toggle'
  static summary = 'Enable or disable an announcement'
  static examples = ['zoho people announcements toggle 12345 --enabled true']

  static args = {
    id: Args.string({ description: 'Announcement ID', required: true }),
  }

  static flags = {
    enabled: Flags.string({ description: 'Enable (true) or disable (false)', required: true, options: ['true', 'false'] }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/api/announcement/enableDisableAnnouncement', id: args.id, enabled: flags.enabled })
        return
      }
      const params = new URLSearchParams()
      params.append('id', args.id)
      params.append('isEnabled', flags.enabled)
      const { data } = await this.apiClient.post('/api/announcement/enableDisableAnnouncement', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      this.outputSuccess(this.extractResult(data), { action: 'announcements.toggle' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
