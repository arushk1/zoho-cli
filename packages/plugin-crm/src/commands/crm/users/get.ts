import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmUsersGet extends CrmBaseCommand<typeof CrmUsersGet> {
  static id = 'crm users get'
  static summary = 'Get details of a specific CRM user'
  static examples = ['zoho crm users get 5437280000000091005']

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/users/${args.id}`)

      if (!data || !data.users || data.users.length === 0) {
        this.outputError('USER_NOT_FOUND', `User with ID ${args.id} not found`)
        this.exit(1)
      }

      this.outputSuccess(data.users[0], {
        action: 'users.get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
