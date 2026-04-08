import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmTagsAdd extends CrmBaseCommand<typeof CrmTagsAdd> {
  static id = 'crm tags add'
  static summary = 'Add tags to a record'
  static examples = [
    'zoho crm tags add Leads 5437280000000328001 --tags "Hot Lead,VIP"',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    tags: Flags.string({ description: 'Comma-separated tag names', required: true }),
    'dry-run': Flags.boolean({ description: 'Print request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const tagNames = flags.tags.split(',').map((t) => t.trim())
      const body = { tags: tagNames.map((name) => ({ name })) }

      if (flags['dry-run']) {
        this.outputSuccess(body, { module: args.module, action: 'add_tags.dry-run' })
        return
      }

      const { data } = await this.apiClient.post(
        `/${args.module}/${args.id}/actions/add_tags`,
        body,
      )

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'add_tags',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
