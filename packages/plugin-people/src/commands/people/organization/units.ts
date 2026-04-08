import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOrganizationUnits extends PeopleBaseCommand<typeof PeopleOrganizationUnits> {
  static id = 'people organization units'
  static summary = 'List organization units'
  static examples = ['zoho people organization units']

  static flags = {
    page: Flags.integer({ description: 'Page offset', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const { data } = await this.apiClient.get('/people/api/v3/orgstructure/units', {
        params: { offset: String(flags.page), limit: String(flags['per-page']) },
      })
      this.outputSuccess(data, {
        action: 'organization.units',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.has_more ?? false,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
