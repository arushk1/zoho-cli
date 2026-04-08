import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOnboardingUpdateCandidate extends PeopleBaseCommand<typeof PeopleOnboardingUpdateCandidate> {
  static id = 'people onboarding update-candidate'
  static summary = 'Update a candidate record'
  static examples = ['zoho people onboarding update-candidate 12345 --data \'{"FirstName":"Jane"}\'']

  static args = {
    id: Args.string({ description: 'Candidate record ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const candidateData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'Candidate', recordId: args.id, body: candidateData })
        return
      }
      const result = await this.formUpdate('Candidate', args.id, candidateData)
      this.outputSuccess(result, { action: 'onboarding.update-candidate' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
