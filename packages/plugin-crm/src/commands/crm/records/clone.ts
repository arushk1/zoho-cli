import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsClone extends CrmBaseCommand<typeof CrmRecordsClone> {
  static id = 'crm records clone'
  static summary = 'Clone an existing record'
  static examples = ['zoho crm records clone Leads 5437280000000328001']

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID to clone', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/${args.id}/actions/clone` })
        return
      }

      const { data } = await this.apiClient.post(`/${args.module}/${args.id}/actions/clone`)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'clone',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
