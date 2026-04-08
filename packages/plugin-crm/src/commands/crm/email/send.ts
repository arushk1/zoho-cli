import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmEmailSend extends CrmBaseCommand<typeof CrmEmailSend> {
  static id = 'crm email send'
  static summary = 'Send an email from a record'
  static examples = [
    'zoho crm email send Leads 5437280000000328001 -d \'{"from":{"user_name":"John","email":"john@example.com"},"to":[{"email":"jane@example.com"}],"subject":"Hello","content":"<h1>Hi</h1>"}\'',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with email fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const emailData = JSON.parse(flags.data)
      const body = { data: [emailData] }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${args.module}/${args.id}/actions/send_mail`, body })
        return
      }

      const { data } = await this.apiClient.post(`/${args.module}/${args.id}/actions/send_mail`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'email.send',
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
