import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingOrganizationsList extends BillingBaseCommand<typeof BillingOrganizationsList> {
  static id = 'billing organizations list'
  static summary = 'List Zoho Billing organizations (use to find the org ID for --org / defaultBillingOrg)'

  async run(): Promise<void> {
    try {
      // The only endpoint that works without an org context — call the client
      // directly instead of billingGet so org resolution is never triggered.
      const { data } = await this.apiClient.get<{ organizations: any[] }>('/organizations')
      this.outputSuccess(data.organizations ?? [], {
        action: 'billing.organizations.list',
        count: data.organizations?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
