import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsMassUpdate extends CrmBaseCommand<typeof CrmRecordsMassUpdate> {
  static id = 'crm records mass-update'
  static summary = 'Mass update multiple records'
  static examples = [
    'zoho crm records mass-update Leads --ids 543728000000032801,543728000000032802 -d \'{"Lead_Status":"Contacted"}\'',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
  }

  static flags = {
    ids: Flags.string({ description: 'Comma-separated record IDs', required: true }),
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const fieldData = JSON.parse(flags.data)
      const ids = flags.ids.split(',').map((id) => id.trim())

      const body = {
        data: [
          {
            ...fieldData,
            ids,
          },
        ],
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/actions/mass_update`, body })
        return
      }

      const { data } = await this.apiClient.post(
        `/${args.module}/actions/mass_update`,
        body,
      )

      this.outputSuccess(data.data ?? data, {
        module: args.module,
        action: 'mass-update',
        count: ids.length,
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
