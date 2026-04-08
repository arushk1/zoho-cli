import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsChangeOwner extends CrmBaseCommand<typeof CrmRecordsChangeOwner> {
  static id = 'crm records change-owner'
  static summary = 'Change the owner of a record'
  static examples = [
    'zoho crm records change-owner Leads 5437280000000328001 --to 5437280000000200001',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    to: Flags.string({ description: 'New owner user ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const body = { owner: { id: flags.to } }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/${args.id}/actions/change_owner`, body })
        return
      }

      const { data } = await this.apiClient.post(
        `/${args.module}/${args.id}/actions/change_owner`,
        body,
      )

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'change-owner',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
