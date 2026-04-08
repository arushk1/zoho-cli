import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../crm-base-command.js'

export default class CrmComposite extends CrmBaseCommand<typeof CrmComposite> {
  static id = 'crm composite'
  static summary = 'Execute up to 5 API requests in a single call'
  static examples = [
    'zoho crm composite --requests \'[{"method":"GET","url":"/v7/Leads","reference_id":"ref1"}]\'',
  ]

  static flags = {
    requests: Flags.string({ description: 'JSON array of sub-requests', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this

    let parsed: unknown
    try {
      parsed = JSON.parse(flags.requests)
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'The --requests flag must be valid JSON')
        return this.exit(3)
      }
      throw error
    }

    try {
      const { data } = await this.apiClient.post('/__composite_requests', {
        __composite_requests: parsed,
      })

      this.outputSuccess(data)
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
