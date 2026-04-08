import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRelatedList extends CrmBaseCommand<typeof CrmRelatedList> {
  static id = 'crm related list'
  static summary = 'List related records for a record'
  static examples = [
    'zoho crm related list Deals 5437280000000328001 Contacts',
    'zoho crm related list Deals 5437280000000328001 Products --fields Product_Name,Unit_Price --page 2',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
    relatedList: Args.string({ description: 'Related list API name (e.g., Contacts, Products)', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 200)', default: 200 }),
    fields: Flags.string({ description: 'Comma-separated field API names to return (required by Zoho API)', char: 'f', required: true }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
        fields: flags.fields,
      }

      const { data } = await this.apiClient.get(`/${args.module}/${args.id}/${args.relatedList}`, { params })

      this.outputSuccess(data.data ?? [], {
        module: args.module,
        action: 'related.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.info?.more_records ?? false,
        count: data.data?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
