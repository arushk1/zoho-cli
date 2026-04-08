import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsEventsList extends ProjectsBaseCommand<typeof ProjectsEventsList> {
  static id = 'projects events list'
  static summary = 'List events in a project'
  static examples = ['zoho projects events list --project 12345']

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Events per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      const { data } = await this.apiClient.get(await this.projectPath(flags.project, '/events'), { params })
      // API returns 204 No Content when there are no events (data will be null/undefined)
      const events = data?.events ?? (Array.isArray(data) ? data : [])
      this.outputSuccess(events, {
        action: 'events.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data?.page_info?.has_next_page ?? false,
        count: events.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
