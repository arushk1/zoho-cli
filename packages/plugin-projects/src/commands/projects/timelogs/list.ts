import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTimelogsList extends ProjectsBaseCommand<typeof ProjectsTimelogsList> {
  static id = 'projects timelogs list'
  static summary = 'List time logs (project-scoped or portal-wide)'
  static examples = [
    'zoho projects timelogs list --project 123456',
    'zoho projects timelogs list --view-type week --bill-status billable',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID (omit for portal-wide timelogs)' }),
    module: Flags.string({
      description: 'Module to fetch timelogs for (required by API)',
      options: ['tasks', 'issue', 'general'],
      multiple: true,
    }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
    users: Flags.string({ description: 'Filter by user IDs (comma-separated)' }),
    'bill-status': Flags.string({ description: 'Filter by billing status', options: ['billable', 'non_billable'] }),
    'component-type': Flags.string({ description: 'Filter by component type' }),
    'view-type': Flags.string({ description: 'View type', options: ['day', 'week', 'month'] }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      if (flags.users) params.users = flags.users
      if (flags['bill-status']) params.bill_status = flags['bill-status']
      if (flags['component-type']) params.component_type = flags['component-type']
      if (flags['view-type']) params.view_type = flags['view-type']
      // V3 API requires module as a JSON-encoded array query parameter
      if (flags.module && flags.module.length > 0) {
        params.module = JSON.stringify(flags.module)
      }

      const url = flags.project
        ? await this.projectPath(flags.project, '/timelogs')
        : await this.portalPath('/timelogs')

      const { data } = await this.apiClient.get(url, { params })

      this.outputSuccess(data.timelogs ?? [], {
        action: 'timelogs.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.timelogs?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
