import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmUsersList extends CrmBaseCommand<typeof CrmUsersList> {
  static id = 'crm users list'
  static summary = 'List CRM users'
  static examples = [
    'zoho crm users list',
    'zoho crm users list --type ActiveUsers',
    'zoho crm users list --type AdminUsers --page 1 --per-page 50',
  ]

  static flags = {
    type: Flags.string({
      description: 'Type of users to list',
      options: [
        'AllUsers',
        'ActiveUsers',
        'DeactiveUsers',
        'ConfirmedUsers',
        'NotConfirmedUsers',
        'DeletedUsers',
        'ActiveConfirmedUsers',
        'AdminUsers',
        'ActiveConfirmedAdmins',
        'CurrentUser',
      ],
    }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Users per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      if (flags.type) params.type = flags.type

      const { data } = await this.apiClient.get('/users', { params })

      const users = data.users ?? []

      this.outputSuccess(users, {
        action: 'users.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: users.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
