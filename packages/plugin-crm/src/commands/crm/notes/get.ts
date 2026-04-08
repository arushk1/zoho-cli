import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotesGet extends CrmBaseCommand<typeof CrmNotesGet> {
  static id = 'crm notes get'
  static summary = 'Get a specific note by ID'
  static examples = ['zoho crm notes get 5437280000000328001']

  static args = {
    id: Args.string({ description: 'Note ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/Notes/${args.id}`)

      if (!data || !data.data || data.data.length === 0) {
        this.outputError('NOTE_NOT_FOUND', `Note with ID ${args.id} not found`)
        this.exit(1)
      }

      this.outputSuccess(data.data[0], {
        action: 'get',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
