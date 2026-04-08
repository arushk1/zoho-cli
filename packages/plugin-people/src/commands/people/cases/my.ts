import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleCasesMy extends PeopleBaseCommand<typeof PeopleCasesMy> {
  static id = 'people cases my'
  static summary = 'List cases assigned to me'
  static examples = ['zoho people cases my']

  static flags = {
    status: Flags.string({ description: 'Status filter (1=Open, 2=InProgress, 3=Awaiting, 4=OnHold, 5=Closed)' }),
    page: Flags.integer({ description: 'Page index', default: 0 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = { index: String(flags.page) }
      if (flags.status) params.status = flags.status
      const { data } = await this.apiClient.get('/api/hrcases/getMyCases', { params })
      this.outputSuccess(this.extractResult(data), { action: 'cases.my' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
