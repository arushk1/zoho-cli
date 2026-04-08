import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleCasesView extends PeopleBaseCommand<typeof PeopleCasesView> {
  static id = 'people cases view'
  static summary = 'View a specific HR case'
  static examples = ['zoho people cases view 12345']

  static args = {
    id: Args.string({ description: 'Case record ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const { data } = await this.apiClient.get('/api/hrcases/viewcase', { params: { recordId: args.id } })
      this.outputSuccess(this.extractResult(data), { action: 'cases.view' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
