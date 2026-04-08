import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotesUpdate extends CrmBaseCommand<typeof CrmNotesUpdate> {
  static id = 'crm notes update'
  static summary = 'Update a note'
  static examples = [
    'zoho crm notes update 5437280000000328001 --content "Updated content"',
    'zoho crm notes update 5437280000000328001 --content "Updated content" --title "New Title"',
  ]

  static args = {
    id: Args.string({ description: 'Note ID', required: true }),
  }

  static flags = {
    content: Flags.string({ description: 'Note content', required: true, char: 'c' }),
    title: Flags.string({ description: 'Note title', char: 't' }),
    'dry-run': Flags.boolean({ description: 'Print request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const noteData: Record<string, string> = {
        id: args.id,
        Note_Content: flags.content,
      }
      if (flags.title) noteData.Note_Title = flags.title

      const body = { data: [noteData] }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'update.dry-run' })
        return
      }

      const { data } = await this.apiClient.put(`/Notes/${args.id}`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        action: 'update',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
