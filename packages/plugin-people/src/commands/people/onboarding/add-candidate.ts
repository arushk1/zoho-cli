import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOnboardingAddCandidate extends PeopleBaseCommand<typeof PeopleOnboardingAddCandidate> {
  static id = 'people onboarding add-candidate'
  static summary = 'Add a new candidate for onboarding'
  static examples = ['zoho people onboarding add-candidate --data \'{"FirstName":"John","LastName":"Doe","EmailID":"john@example.com"}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with candidate fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const candidateData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'Candidate', body: candidateData })
        return
      }
      const result = await this.formInsert('Candidate', candidateData)
      this.outputSuccess(result, { action: 'onboarding.add-candidate' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
