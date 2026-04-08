import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsMassDelete extends CrmBaseCommand<typeof CrmRecordsMassDelete> {
  static id = 'crm records mass-delete'
  static summary = 'Mass delete multiple records'
  static examples = [
    'zoho crm records mass-delete Leads --ids 543728000000032801,543728000000032802',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
  }

  static flags = {
    ids: Flags.string({ description: 'Comma-separated record IDs', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const ids = flags.ids.split(',').map((id) => id.trim())

      const body = {
        data: [
          {
            ids,
          },
        ],
      }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/actions/mass_delete`, body })
        return
      }

      const { data } = await this.apiClient.post(
        `/${args.module}/actions/mass_delete`,
        body,
      )

      this.outputSuccess(data.data ?? data, {
        module: args.module,
        action: 'mass-delete',
        count: ids.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
