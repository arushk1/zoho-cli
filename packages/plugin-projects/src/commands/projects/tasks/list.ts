import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksList extends ProjectsBaseCommand<typeof ProjectsTasksList> {
  static id = 'projects tasks list'
  static summary = 'List tasks in a project'
  static examples = [
    'zoho projects tasks list --project 12345',
    'zoho projects tasks list --project 12345 --status open --priority high',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    status: Flags.string({ description: 'Filter by task status' }),
    priority: Flags.string({ description: 'Filter by priority' }),
    owner: Flags.string({ description: 'Filter by owner ID' }),
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
      if (flags.priority) params.priority = flags.priority
      if (flags.owner) params.owner = flags.owner
      if (flags['sort-by']) params.sort_by = flags['sort-by']
      if (flags['sort-order']) params.sort_order = flags['sort-order']

      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, '/tasks'),
        { params },
      )

      this.outputSuccess(data.tasks ?? [], {
        action: 'tasks.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.tasks?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
