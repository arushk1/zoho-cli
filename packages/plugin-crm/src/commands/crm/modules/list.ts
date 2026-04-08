import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmModulesList extends CrmBaseCommand<typeof CrmModulesList> {
  static id = 'crm modules list'
  static summary = 'List all CRM modules'
  static examples = ['zoho crm modules list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get<{ modules: Array<{ api_name: string }> }>('/settings/modules')

      const modules = data.modules ?? []
      await this.moduleCache.set(modules.map((m) => m.api_name))

      this.outputSuccess(modules, {
        action: 'modules.list',
        count: modules.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
