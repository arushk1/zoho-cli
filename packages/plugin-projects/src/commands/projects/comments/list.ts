import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsCommentsList extends ProjectsBaseCommand<typeof ProjectsCommentsList> {
  static id = 'projects comments list'
  static summary = 'List comments on a task, tasklist, or other project entity'
  static examples = [
    'zoho projects comments list --project 12345 --entity-type tasks --entity-id 67890',
    'zoho projects comments list --project 12345 --entity-type tasklists --entity-id 11111',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    'entity-type': Flags.string({
      description: 'Entity type (tasks, tasklists, phases)',
      required: true,
      options: ['tasks', 'tasklists', 'phases'],
    }),
    'entity-id': Flags.string({ description: 'Entity ID', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Comments per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      // Comments are project-scoped: /portal/{id}/projects/{projectId}/{entityType}/{entityId}/comments
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, `/${flags['entity-type']}/${flags['entity-id']}/comments`),
        { params },
      )
      const comments = data.comments ?? data.comment ?? data
      this.outputSuccess(comments, {
        action: 'comments.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: Array.isArray(comments) ? comments.length : 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
