import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotesCreate extends CrmBaseCommand<typeof CrmNotesCreate> {
  static id = 'crm notes create'
  static summary = 'Create a note for a record'
  static examples = [
    'zoho crm notes create Leads 5437280000000328001 --content "Follow up next week"',
    'zoho crm notes create Deals 5437280000000328001 --content "Meeting notes" --title "Q4 Review"',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
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
        Note_Content: flags.content,
      }
      if (flags.title) noteData.Note_Title = flags.title

      const body = { data: [noteData] }

      if (flags['dry-run']) {
        this.outputSuccess(body, { module: args.module, action: 'create.dry-run' })
        return
      }

      const { data } = await this.apiClient.post(`/${args.module}/${args.id}/Notes`, body)

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'create',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
