import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsViewsGet extends AnalyticsBaseCommand<typeof AnalyticsViewsGet> {
  static id = 'analytics views get'
  static summary = 'Get view details'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  static flags = {
    'with-meta': Flags.boolean({ description: 'Include column and involved-view details (withInvolvedMetaInfo)', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.analyticsGet(
        `/views/${args.id}`,
        flags['with-meta'] ? { withInvolvedMetaInfo: true } : undefined,
        { org: false },
      )
      this.outputSuccess(data.views ?? data, { action: 'analytics.views.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
