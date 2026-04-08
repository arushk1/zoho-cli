import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsForumsList extends ProjectsBaseCommand<typeof ProjectsForumsList> {
  static id = 'projects forums list'
  static summary = 'List forums in a project'
  static examples = [
    'zoho projects forums list --project 12345',
    'zoho projects forums list --project 12345 --page 2 --per-page 50',
  ]

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page (max 100)', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const { data } = await this.apiClient.get(await this.projectPath(flags.project, '/forums'), { params })

      this.outputSuccess(data.forums ?? [], {
        action: 'forums.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.forums?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
