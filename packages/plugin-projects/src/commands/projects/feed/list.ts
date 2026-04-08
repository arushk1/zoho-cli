import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsFeedList extends ProjectsBaseCommand<typeof ProjectsFeedList> {
  static id = 'projects feed list'
  static summary = 'List activity feed for a project (uses the activities endpoint)'
  static examples = [
    'zoho projects feed list --project 12345',
    'zoho projects feed list --project 12345 --module tasks --action updated',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    module: Flags.string({
      description: 'Module to fetch activities for',
      options: ['tasks', 'tasklists'],
      default: 'tasks',
    }),
    action: Flags.string({
      description: 'Activity action to filter by',
      options: ['updated', 'deleted'],
      default: 'updated',
    }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Feed entries per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
        module: flags.module,
        action: flags.action,
      }
      // V3 API uses /activities endpoint for project feed
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, '/activities'),
        { params },
      )
      const feed = data.activities ?? data.feed ?? (Array.isArray(data) ? data : [])
      this.outputSuccess(feed, {
        action: 'feed.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: Array.isArray(feed) ? feed.length : 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
