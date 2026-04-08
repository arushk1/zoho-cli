import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsPhasesList extends ProjectsBaseCommand<typeof ProjectsPhasesList> {
  static id = 'projects phases list'
  static summary = 'List phases (project-scoped or portal-wide)'
  static examples = [
    'zoho projects phases list --project 123456',
    'zoho projects phases list',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID (omit for portal-wide phases)' }),
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

      const url = flags.project
        ? await this.projectPath(flags.project, '/phases')
        : await this.portalPath('/phases')

      const { data } = await this.apiClient.get(url, { params })

      // V3 API returns phases (milestones) under the "milestones" key
      const phases = data.phases ?? data.milestones ?? []

      this.outputSuccess(phases, {
        action: 'phases.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: Array.isArray(data.page_info) ? (data.page_info[0]?.has_next_page ?? false) : (data.page_info?.has_next_page ?? false),
        count: phases.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
