import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsGet extends CrmBaseCommand<typeof CrmRecordsGet> {
  static id = 'crm records get'
  static summary = 'Get a specific record by ID'
  static examples = ['zoho crm records get Leads 5437280000000328001']

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    fields: Flags.string({ description: 'Comma-separated field API names to return', char: 'f' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {}
      if (flags.fields) params.fields = flags.fields

      const { data } = await this.apiClient.get(`/${args.module}/${args.id}`, { params })

      if (!data || !data.data || data.data.length === 0) {
        this.outputError('RECORD_NOT_FOUND', `Record with ID ${args.id} not found in ${args.module}`)
        this.exit(1)
      }

      this.outputSuccess(data.data[0], {
        module: args.module,
        action: 'get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
