import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmFieldsGet extends CrmBaseCommand<typeof CrmFieldsGet> {
  static id = 'crm fields get'
  static summary = 'Get details of a specific field'
  static examples = ['zoho crm fields get 5437280000000321001 -m Leads']

  static args = {
    id: Args.string({ description: 'Field ID', required: true }),
  }

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const { data } = await this.apiClient.get(`/settings/fields/${args.id}`, {
        params: { module: flags.module },
      })

      if (!data || !data.fields || data.fields.length === 0) {
        this.outputError('FIELD_NOT_FOUND', `Field with ID ${args.id} not found in module ${flags.module}`)
        this.exit(1)
      }

      this.outputSuccess(data.fields[0], {
        module: flags.module,
        action: 'fields.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
