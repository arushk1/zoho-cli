import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsUsersList extends ProjectsBaseCommand<typeof ProjectsUsersList> {
  static id = 'projects users list'
  static summary = 'List users in a portal'
  static examples = [
    'zoho projects users list',
    'zoho projects users list --page 2 --per-page 50',
  ]

  static flags = {
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

      const { data } = await this.apiClient.get(await this.portalPath('/users'), { params })

      this.outputSuccess(data.users ?? [], {
        action: 'users.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_info?.has_next_page ?? false,
        count: data.users?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
