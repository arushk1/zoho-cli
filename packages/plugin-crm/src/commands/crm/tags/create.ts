import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmTagsCreate extends CrmBaseCommand<typeof CrmTagsCreate> {
  static id = 'crm tags create'
  static summary = 'Create a tag for a module'
  static examples = [
    'zoho crm tags create -m Leads --name "Hot Lead"',
    'zoho crm tags create -m Contacts --name "VIP" --color "#FF0000"',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
    name: Flags.string({ description: 'Tag name', required: true }),
    color: Flags.string({ description: 'Tag color code (e.g., #FF0000)' }),
    'dry-run': Flags.boolean({ description: 'Print request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const tagData: Record<string, string> = { name: flags.name }
      if (flags.color) tagData.color_code = flags.color

      const body = { tags: [tagData] }

      if (flags['dry-run']) {
        this.outputSuccess(body, { module: flags.module, action: 'create.dry-run' })
        return
      }

      const { data } = await this.apiClient.post('/settings/tags', body, {
        params: { module: flags.module },
      })

      this.outputSuccess(data.tags?.[0] ?? data, {
        module: flags.module,
        action: 'create',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
