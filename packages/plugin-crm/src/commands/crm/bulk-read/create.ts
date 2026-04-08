import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkReadCreate extends CrmBaseCommand<typeof CrmBulkReadCreate> {
  static id = 'crm bulk-read create'
  static summary = 'Create a bulk read job'
  static examples = [
    'zoho crm bulk-read create -m Leads',
    'zoho crm bulk-read create -m Contacts -f Email,Last_Name --page 2',
    'zoho crm bulk-read create -m Deals --criteria \'{"group":[{"field":{"api_name":"Stage"},"comparator":"equal","value":"Closed Won"}]}\'',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name', required: true, char: 'm' }),
    criteria: Flags.string({ description: 'JSON filter criteria' }),
    fields: Flags.string({ description: 'Comma-separated field API names', char: 'f' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'dry-run': Flags.boolean({ description: 'Preview the bulk read job without submitting', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const query: Record<string, unknown> = {
        module: { api_name: flags.module },
        page: flags.page,
      }

      if (flags.criteria) {
        query.criteria = JSON.parse(flags.criteria)
      }

      if (flags.fields) {
        query.fields = flags.fields.split(',').map((f) => ({ api_name: f.trim() }))
      }

      if (flags['dry-run']) {
        this.outputSuccess({ query }, { module: flags.module, action: 'bulk-read-create-preview' })
        return
      }

      const { data } = await this.apiClient.post('/read', { query })

      this.outputSuccess(data.data ?? data, {
        module: flags.module,
        action: 'bulk-read-create',
      })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --criteria flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
