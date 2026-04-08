import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsAttachmentsList extends ProjectsBaseCommand<typeof ProjectsAttachmentsList> {
  static id = 'projects attachments list'
  static summary = 'List attachments for a task or tasklist in a project'
  static examples = [
    'zoho projects attachments list --project 12345 --entity-type tasks --entity-id 67890',
    'zoho projects attachments list --project 12345 --entity-type tasklists --entity-id 11111',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    'entity-type': Flags.string({
      description: 'Entity type to list attachments for',
      options: ['tasks', 'tasklists'],
      required: true,
    }),
    'entity-id': Flags.string({ description: 'Entity ID', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Attachments per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      // V3 API requires entity-scoped attachments path:
      // /portal/{id}/projects/{projectId}/{entityType}/{entityId}/attachments
      const { data } = await this.apiClient.get(
        await this.projectPath(flags.project, `/${flags['entity-type']}/${flags['entity-id']}/attachments`),
        { params },
      )
      // V3 API returns attachment (singular) key
      const attachments = data.attachments ?? data.attachment ?? data
      this.outputSuccess(attachments, {
        action: 'attachments.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: Array.isArray(attachments) ? attachments.length : 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
