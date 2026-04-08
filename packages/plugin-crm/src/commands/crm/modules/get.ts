import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmModulesGet extends CrmBaseCommand<typeof CrmModulesGet> {
  static id = 'crm modules get'
  static summary = 'Get details of a specific CRM module'
  static examples = ['zoho crm modules get Leads']

  static args = {
    module: Args.string({ description: 'Module API name (e.g., Leads, Contacts, Deals)', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/settings/modules/${args.module}`)

      if (!data || !data.modules || data.modules.length === 0) {
        this.outputError('MODULE_NOT_FOUND', `Module '${args.module}' not found`)
        this.exit(1)
      }

      this.outputSuccess(data.modules[0], {
        action: 'modules.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
