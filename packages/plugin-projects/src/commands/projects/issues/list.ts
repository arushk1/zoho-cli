import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsIssuesList extends ProjectsBaseCommand<typeof ProjectsIssuesList> {
  static id = 'projects issues list'
  static summary = 'List issues in a project'
  static examples = [
    'zoho projects issues list --project 123456',
    'zoho projects issues list --project 123456 --severity Major --status open',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    'sort-order': Flags.string({ description: 'Sort order', options: ['asc', 'desc'] }),
    severity: Flags.string({ description: 'Filter by severity' }),
    status: Flags.string({ description: 'Filter by status' }),
    assignee: Flags.string({ description: 'Filter by assignee ID' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      if (flags['sort-by']) params.sort_by = flags['sort-by']
      if (flags['sort-order']) params.sort_order = flags['sort-order']
      if (flags.severity) params.severity = flags.severity
      if (flags.status) params.status = flags.status
      if (flags.assignee) params.assignee = flags.assignee

      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, '/issues'),
        { params },
      )

      this.outputSuccess(data.issues ?? [], {
        action: 'issues.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.issues?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
