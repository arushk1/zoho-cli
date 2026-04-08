import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../projects-base-command.js'

export default class ProjectsList extends ProjectsBaseCommand<typeof ProjectsList> {
  static id = 'projects list'
  static summary = 'List projects in a portal'
  static examples = [
    'zoho projects list',
    'zoho projects list --status active --sort-by name --sort-order asc',
  ]

  static flags = {
    status: Flags.string({
      description: 'Filter by project status',
      options: ['active', 'archived', 'completed', 'template'],
    }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    'sort-order': Flags.string({ description: 'Sort order', options: ['asc', 'desc'] }),
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
      if (flags.status) params.status = flags.status
      if (flags['sort-by']) params.sort_by = flags['sort-by']
      if (flags['sort-order']) params.sort_order = flags['sort-order']

      const { data } = await this.apiClient.get(await this.portalPath('/projects'), { params })

      // V3 API returns a top-level array of projects (not wrapped in { projects: [...] })
      const projects = Array.isArray(data) ? data : (data.projects ?? [])

      this.outputSuccess(projects, {
        action: 'projects.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: projects.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
