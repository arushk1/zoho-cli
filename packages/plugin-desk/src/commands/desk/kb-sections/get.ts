import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbSectionsGet extends DeskBaseCommand<typeof DeskKbSectionsGet> {
  static id = 'desk kb-sections get'
  static summary = 'Get a Zoho Desk knowledge base section by ID'

  static args = {
    id: Args.string({ description: 'Section ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/kbSections/${args.id}`)
      this.outputSuccess(data, { action: 'desk.kb-sections.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
