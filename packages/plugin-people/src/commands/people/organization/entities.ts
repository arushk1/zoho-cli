import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOrganizationEntities extends PeopleBaseCommand<typeof PeopleOrganizationEntities> {
  static id = 'people organization entities'
  static summary = 'List organization entities'
  static examples = ['zoho people organization entities']

  static flags = {
    page: Flags.integer({ description: 'Page offset', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const { data } = await this.apiClient.get('/people/api/v3/orgstructure/entities', {
        params: { offset: String(flags.page), limit: String(flags['per-page']) },
      })
      this.outputSuccess(data, {
        action: 'organization.entities',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.has_more ?? false,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
