import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmLeadsConvert extends CrmBaseCommand<typeof CrmLeadsConvert> {
  static id = 'crm leads convert'
  static summary = 'Convert a lead into a contact/account/deal'
  static examples = [
    'zoho crm leads convert 5437280000000328001',
    'zoho crm leads convert 5437280000000328001 --dry-run',
    'zoho crm leads convert 5437280000000328001 -d \'{"Deals":{"Deal_Name":"New Deal","Closing_Date":"2026-12-31"}}\'',
  ]

  static args = {
    id: Args.string({ description: 'Lead record ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON conversion options', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview conversion options without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        const conversionPreviewData = flags.data ? JSON.parse(flags.data) : {}
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/Leads/${args.id}/actions/convert`, body: { data: [conversionPreviewData] } }, {
          module: 'Leads',
          action: 'convert-preview',
        })
        return
      }

      const conversionData = flags.data ? JSON.parse(flags.data) : {}
      const body = { data: [conversionData] }

      const { data } = await this.apiClient.post(`/Leads/${args.id}/actions/convert`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: 'Leads',
        action: 'convert',
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
