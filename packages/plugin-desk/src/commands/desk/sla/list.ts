import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskSlaList extends DeskBaseCommand<typeof DeskSlaList> {
  static id = 'desk sla list'
  static summary = 'List Zoho Desk SLA rules'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/slaRules')
      this.outputSuccess(data.data ?? [], { action: 'desk.sla.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
