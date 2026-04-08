import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmTagsUpdate extends CrmBaseCommand<typeof CrmTagsUpdate> {
  static id = 'crm tags update'
  static summary = 'Update a tag'
  static examples = [
    'zoho crm tags update 5437280000000328001 -m Leads --name "Cold Lead"',
  ]

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
    name: Flags.string({ description: 'New tag name', required: true }),
    'dry-run': Flags.boolean({ description: 'Print request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = { tags: [{ name: flags.name }] }

      if (flags['dry-run']) {
        this.outputSuccess(body, { module: flags.module, action: 'update.dry-run' })
        return
      }

      const { data } = await this.apiClient.put(`/settings/tags/${args.id}`, body, {
        params: { module: flags.module },
      })

      this.outputSuccess(data.tags?.[0] ?? data, {
        module: flags.module,
        action: 'update',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
