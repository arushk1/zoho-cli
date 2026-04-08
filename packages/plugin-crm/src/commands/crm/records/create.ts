import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsCreate extends CrmBaseCommand<typeof CrmRecordsCreate> {
  static id = 'crm records create'
  static summary = 'Create a new record'
  static examples = ['zoho crm records create Leads --data \'{"Last_Name":"Smith","Email":"smith@example.com"}\'']

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with record fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const recordData = JSON.parse(flags.data)
      const body = { data: [recordData] }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}`, body })
        return
      }

      const { data } = await this.apiClient.post(`/${args.module}`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'create',
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
