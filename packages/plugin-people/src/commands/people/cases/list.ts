import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleCasesList extends PeopleBaseCommand<typeof PeopleCasesList> {
  static id = 'people cases list'
  static summary = 'List all HR cases'
  static examples = ['zoho people cases list --status 1 --period 2']

  static flags = {
    status: Flags.string({ description: 'Status filter (1=Open, 2=InProgress, 3=Awaiting, 4=OnHold, 5=Closed)' }),
    category: Flags.string({ description: 'Category ID filter' }),
    query: Flags.string({ description: 'Search query' }),
    period: Flags.string({ description: 'Time period (0=Today, 1=Yesterday, 2=Past7Days, 3=Past30Days)' }),
    page: Flags.integer({ description: 'Page index', default: 0 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = { index: String(flags.page) }
      if (flags.status) params.status = flags.status
      if (flags.category) params.categoryId = flags.category
      if (flags.query) params.query = flags.query
      if (flags.period) params.periodOfTime = flags.period
      const { data } = await this.apiClient.get('/api/hrcases/getAllCases', { params })
      this.outputSuccess(this.extractResult(data), { action: 'cases.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
