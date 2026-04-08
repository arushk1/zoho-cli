import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsDashboardsList extends ProjectsBaseCommand<typeof ProjectsDashboardsList> {
  static id = 'projects dashboards list'
  static summary = 'List dashboards'
  static examples = ['zoho projects dashboards list']

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Dashboards per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      const { data } = await this.apiClient.get(await this.portalPath('/dashboards'), { params })
      // V3 API returns dashboards as a list of folders
      const dashboards = data.dashboards ?? data.folders ?? []
      this.outputSuccess(dashboards, {
        action: 'dashboards.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: dashboards.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
