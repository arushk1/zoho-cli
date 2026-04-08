import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsBlueprint extends CrmBaseCommand<typeof CrmRecordsBlueprint> {
  static id = 'crm records blueprint'
  static summary = 'Get or update a record blueprint (process/approval transitions)'
  static examples = [
    'zoho crm records blueprint Leads 5437280000000328001 get',
    'zoho crm records blueprint Leads 5437280000000328001 update -d \'{"blueprint":[{"transition_id":"1234","data":{"Stage":"Qualification"}}]}\'',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
    action: Args.string({ description: 'Action to perform', required: true, options: ['get', 'update'] }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON blueprint data (required for update)', char: 'd' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (args.action === 'get') {
        const { data } = await this.apiClient.get(`/${args.module}/${args.id}/actions/blueprint`)

        this.outputSuccess(data.blueprint ?? data, {
          module: args.module,
          action: 'blueprint-get',
        })
        return
      }

      // update
      if (!flags.data) {
        this.outputError('MISSING_DATA', 'The --data flag is required for blueprint update')
        this.exit(2)
      }

      const body = JSON.parse(flags.data!)
      const { data } = await this.apiClient.put(`/${args.module}/${args.id}/actions/blueprint`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'blueprint-update',
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
