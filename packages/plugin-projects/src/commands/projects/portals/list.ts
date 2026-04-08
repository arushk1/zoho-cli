import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPortalsList extends ProjectsBaseCommand<typeof ProjectsPortalsList> {
  static id = 'projects portals list'
  static summary = 'List all accessible Zoho Projects portals'
  static examples = ['zoho projects portals list']

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const { data } = await this.apiClient.get('/portals', { params })

      // V3 API returns a top-level array of portals (not wrapped in { portals: [...] })
      const portals = Array.isArray(data) ? data : (data.portals ?? [])

      this.outputSuccess(portals, {
        action: 'portals.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: false,
        count: portals.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
