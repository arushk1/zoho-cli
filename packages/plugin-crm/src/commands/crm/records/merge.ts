import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsMerge extends CrmBaseCommand<typeof CrmRecordsMerge> {
  static id = 'crm records merge'
  static summary = 'Merge duplicate records into a master record'
  static examples = [
    'zoho crm records merge Leads 5437280000000328001 --with 5437280000000328002,5437280000000328003',
    'zoho crm records merge Leads 5437280000000328001 --with 5437280000000328002 -d \'{"master_record_fields":["Email"],"data":[{"id":"5437280000000328002","_fields":[]}]}\'',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    masterId: Args.string({ description: 'Master record ID (survives the merge)', required: true }),
  }

  static flags = {
    with: Flags.string({ description: 'Comma-separated record IDs to merge into master', required: true }),
    data: Flags.string({
      description:
        'JSON override for the merge entry, e.g. {"master_record_fields":["Email"],"data":[{"id":"<srcId>","_fields":["Phone"]}]}',
      char: 'd',
    }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const sourceIds = flags.with.split(',').map((id) => id.trim()).filter(Boolean)
      const mergeEntry: Record<string, unknown> = {
        master_record_fields: [],
        data: sourceIds.map((id) => ({ id, _fields: [] })),
      }

      if (flags.data) {
        Object.assign(mergeEntry, JSON.parse(flags.data))
      }

      const body = { merge: [mergeEntry] }
      const path = `/${args.module}/${args.masterId}/actions/merge`

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
