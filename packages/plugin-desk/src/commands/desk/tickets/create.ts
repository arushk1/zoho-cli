import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsCreate extends DeskBaseCommand<typeof DeskTicketsCreate> {
  static id = 'desk tickets create'
  static summary = 'Create a new Zoho Desk ticket'

  static flags = {
    data: Flags.string({ description: 'JSON data for the ticket', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.tickets.create.dry-run' })
        return
      }

      const data = await this.deskPost('/tickets', body)
      this.outputSuccess(data, { action: 'desk.tickets.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
