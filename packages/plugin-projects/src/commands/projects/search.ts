import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../projects-base-command.js'

export default class ProjectsSearch extends ProjectsBaseCommand<typeof ProjectsSearch> {
  static id = 'projects search'
  static summary = 'Search across projects, tasks, issues, forums, and more'
  static examples = [
    'zoho projects search --query "sprint planning"',
    'zoho projects search --query "bug fix" --project 12345 --module tasks',
  ]

  static flags = {
    query: Flags.string({ description: 'Search query string', required: true, char: 'q' }),
    project: Flags.string({ description: 'Scope search to a specific project', char: 'p' }),
    module: Flags.string({
      description: 'Module to search in (required by V3 API)',
      options: ['projects', 'milestones', 'tasks', 'tasklists'],
      required: true,
    }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        search_term: flags.query,
        module: flags.module,
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const basePath = flags.project
        ? await this.projectPath(flags.project, '/search')
        : await this.portalPath('/search')

      const { data } = await this.apiClient.get(basePath, { params })
      // V3 search returns { count, <module>: [...] } format
      const resultKey = flags.module
      const results = data[resultKey] ?? data.search_results ?? data
      this.outputSuccess(results, {
        action: 'search',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: Array.isArray(results) ? results.length : (data.count ?? 0),
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
