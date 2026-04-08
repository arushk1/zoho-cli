import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleCasesAdd extends PeopleBaseCommand<typeof PeopleCasesAdd> {
  static id = 'people cases add'
  static summary = 'Create a new HR case'
  static examples = ['zoho people cases add --data \'{"subject":"Laptop issue","description":"Screen flickering"}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with case fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const caseData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/api/hrcases/addcase', body: caseData })
        return
      }
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(caseData)) {
        params.append(key, String(value))
      }
      const { data } = await this.apiClient.post('/api/hrcases/addcase', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      this.outputSuccess(this.extractResult(data), { action: 'cases.add' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
