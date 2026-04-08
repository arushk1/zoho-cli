import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsUpsert extends CrmBaseCommand<typeof CrmRecordsUpsert> {
  static id = 'crm records upsert'
  static summary = 'Upsert a record (insert or update based on duplicate check)'
  static examples = [
    'zoho crm records upsert Leads --data \'{"Last_Name":"Smith","Email":"smith@example.com"}\' --duplicate-check-fields Email',
    'zoho crm records upsert Contacts --data \'{"Email":"j@example.com","Last_Name":"Doe"}\' --duplicate-check-fields Email,Last_Name --dry-run',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with record fields', required: true, char: 'd' }),
    'duplicate-check-fields': Flags.string({ description: 'Comma-separated fields to check for duplicates', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const recordData = JSON.parse(flags.data)
      const duplicateCheckFields = flags['duplicate-check-fields'].split(',').map((f) => f.trim())
      const body = { data: [recordData], duplicate_check_fields: duplicateCheckFields }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/upsert`, body })
        return
      }

      const { data } = await this.apiClient.post(`/${args.module}/upsert`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'upsert',
      })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
