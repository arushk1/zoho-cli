import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleSeparationList extends PeopleBaseCommand<typeof PeopleSeparationList> {
  static id = 'people separation list'
  static summary = 'List separation/exit records'
  static examples = ['zoho people separation list']

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const sIndex = ((flags.page - 1) * flags['per-page']) + 1
      const { data } = await this.apiClient.get('/people/api/forms/P_Separation/getRecords', {
        params: { sIndex: String(sIndex), limit: String(flags['per-page']) },
      })
      this.outputSuccess(this.extractResult(data), {
        action: 'separation.list',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
