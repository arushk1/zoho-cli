import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsMerge extends CrmBaseCommand<typeof CrmRecordsMerge> {
  static id = 'crm records merge'
  static summary = 'Merge duplicate records into a master record'
  static examples = [
    'zoho crm records merge Leads 5437280000000328001 --with 5437280000000328002,5437280000000328003',
    'zoho crm records merge Leads 5437280000000328001 --with 5437280000000328002 -d \'[{"api_name":"Email","record_id":"5437280000000328002"}]\'',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    masterId: Args.string({ description: 'Master record ID (survives the merge)', required: true }),
  }

  static flags = {
    with: Flags.string({ description: 'Comma-separated record IDs to merge into master', required: true }),
    data: Flags.string({ description: 'JSON array of field-level merge choices (field_level_merge)', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const mergeRecords = flags.with.split(',').map((id) => id.trim()).filter(Boolean)
      const mergeEntry: Record<string, unknown> = {
        original_record_id: args.masterId,
        merge_records: mergeRecords,
      }

      if (flags.data) {
        mergeEntry.field_level_merge = JSON.parse(flags.data)
      }

      const body = { merge: [mergeEntry] }
      const path = `/${args.module}/actions/merge`

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, body })
        return
      }

      const { data } = await this.apiClient.post(path, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'merge',
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
