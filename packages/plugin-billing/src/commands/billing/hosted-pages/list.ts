import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingHostedPagesList extends BillingBaseCommand<typeof BillingHostedPagesList> {
  static id = 'billing hosted-pages list'
  static summary = 'List hosted pages'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const data = await this.billingGet('/hostedpages', params)
      this.outputSuccess(data.hostedpages ?? [], {
        action: 'billing.hosted-pages.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.hostedpages?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
