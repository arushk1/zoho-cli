import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmUsersCreate extends CrmBaseCommand<typeof CrmUsersCreate> {
  static id = 'crm users create'
  static summary = 'Add a new CRM user (sends an email invitation)'
  static examples = [
    'zoho crm users create --data \'{"first_name":"Jane","last_name":"Doe","email":"jane@co.com","role":"<roleId>","profile":"<profileId>"}\' --dry-run',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with user field values (first_name, last_name, email, role, profile)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsedData: Record<string, unknown>
      try {
        parsedData = JSON.parse(flags.data)
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
        throw error
      }

      const body = { users: [parsedData] }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/users', body }, { action: 'users.create' })
        return
      }

      const { data } = await this.apiClient.post('/users', body)
      this.outputSuccess(data?.users ?? data, { action: 'users.create' })
    } catch (error: any) {
      // User API errors nest per-user results under response.data.users[]
      const userErr = error.response?.data?.users?.[0]
      if (userErr && userErr.status === 'error') {
        this.outputError(userErr.code ?? 'API_ERROR', JSON.stringify({ message: userErr.message, details: userErr.details }))
        this.exit(1)
      }
      this.handleApiError(error)
    }
  }
}
