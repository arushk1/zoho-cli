import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasklistsList extends ProjectsBaseCommand<typeof ProjectsTasklistsList> {
  static id = 'projects tasklists list'
  static summary = 'List task lists (portal-wide or within a project)'
  static examples = [
    'zoho projects tasklists list',
    'zoho projects tasklists list --project 12345',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID (if omitted, lists portal-wide tasklists)' }),
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

      const path = flags.project
        ? await this.projectPath(flags.project, '/tasklists')
        : await this.portalPath('/tasklists')

      const { data } = await this.apiClient.get(path, { params })

      this.outputSuccess(data.tasklists ?? [], {
        action: 'tasklists.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.tasklists?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
