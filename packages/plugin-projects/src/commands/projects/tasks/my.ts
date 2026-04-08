import { Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsTasksMy extends ProjectsBaseCommand<typeof ProjectsTasksMy> {
  static id = 'projects tasks my'
  static summary = 'List tasks assigned to the current user'
  static examples = [
    'zoho projects tasks my',
    'zoho projects tasks my --page 2 --per-page 50',
  ]

  static flags = {
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
      if (flags['sort-by']) params.sort_by = flags['sort-by']
      if (flags['sort-order']) params.sort_order = flags['sort-order']

      // V3 API uses /tasks?type=mytasks instead of /mytasks
      const { data } = await this.apiClient.get(
        await this.portalPath('/tasks'),
        { params: { ...params, type: 'mytasks' } },
      )

      this.outputSuccess(data.tasks ?? [], {
        action: 'tasks.my',
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
