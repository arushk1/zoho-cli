import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsMerge extends CrmBaseCommand<typeof CrmRecordsMerge> {
  static id = 'crm records merge'
  static summary = 'Merge duplicate records into a master record'
  static examples = [
    'zoho crm records merge Leads 5437280000000328001 --with 5437280000000328002,5437280000000328003',
    'zoho crm records merge Leads 5437280000000328001 --with 5437280000000328002 -d \'{"Email":"master"}\'',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    masterId: Args.string({ description: 'Master record ID (survives the merge)', required: true }),
  }

  static flags = {
    with: Flags.string({ description: 'Comma-separated record IDs to merge into master', required: true }),
    data: Flags.string({ description: 'JSON merge instructions for field-level choices', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const mergeIds = flags.with.split(',').map((id) => ({ id: id.trim() }))
      const body: Record<string, unknown> = { data: mergeIds }

      if (flags.data) {
        body.data_merge = JSON.parse(flags.data)
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/${args.masterId}/actions/merge`, body })
        return
      }

      const { data } = await this.apiClient.post(
        `/${args.module}/${args.masterId}/actions/merge`,
        body,
      )

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
