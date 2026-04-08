import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsUpdate extends CrmBaseCommand<typeof CrmRecordsUpdate> {
  static id = 'crm records update'
  static summary = 'Update an existing record'
  static examples = ['zoho crm records update Leads 5437280000000328001 --data \'{"Email":"new@example.com"}\'']

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const recordData = JSON.parse(flags.data)
      const body = { data: [{ id: args.id, ...recordData }] }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/${args.module}`, body })
        return
      }

      const { data } = await this.apiClient.put(`/${args.module}`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'update',
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
