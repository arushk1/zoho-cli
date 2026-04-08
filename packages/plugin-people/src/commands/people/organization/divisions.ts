import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOrganizationDivisions extends PeopleBaseCommand<typeof PeopleOrganizationDivisions> {
  static id = 'people organization divisions'
  static summary = 'List organization divisions'
  static examples = ['zoho people organization divisions']

  static flags = {
    page: Flags.integer({ description: 'Page offset', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const { data } = await this.apiClient.get('/people/api/v3/orgstructure/divisions', {
        params: { offset: String(flags.page), limit: String(flags['per-page']) },
      })
      this.outputSuccess(data, {
        action: 'organization.divisions',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.has_more ?? false,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
