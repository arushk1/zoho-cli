import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRolesList extends CrmBaseCommand<typeof CrmRolesList> {
  static id = 'crm roles list'
  static summary = 'List all CRM roles'
  static examples = ['zoho crm roles list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/settings/roles')

      const roles = data.roles ?? []

      this.outputSuccess(roles, {
        action: 'roles.list',
        count: roles.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
