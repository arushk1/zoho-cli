import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOnboardingTrigger extends PeopleBaseCommand<typeof PeopleOnboardingTrigger> {
  static id = 'people onboarding trigger'
  static summary = 'Trigger onboarding for an employee or candidate'
  static examples = ['zoho people onboarding trigger 12345']

  static args = {
    userId: Args.string({ description: 'Employee or candidate user ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/api/Employee/triggerOnboarding?userId=${args.userId}` })
        return
      }
      const { data } = await this.apiClient.post(`/api/Employee/triggerOnboarding`, null, {
        params: { userId: args.userId },
      })
      this.outputSuccess(this.extractResult(data), { action: 'onboarding.trigger' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
