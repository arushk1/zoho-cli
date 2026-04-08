import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsDelete extends CrmBaseCommand<typeof CrmRecordsDelete> {
  static id = 'crm records delete'
  static summary = 'Delete a record'
  static examples = ['zoho crm records delete Leads 5437280000000328001']

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/${args.module}?ids=${args.id}` })
        return
      }

      const { data } = await this.apiClient.delete(`/${args.module}`, {
        params: { ids: args.id },
      })

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
