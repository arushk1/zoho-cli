import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsShare extends CrmBaseCommand<typeof CrmRecordsShare> {
  static id = 'crm records share'
  static summary = 'List, add, update, or revoke record sharing'
  static examples = [
    'zoho crm records share Leads 5437280000000328001 list',
    'zoho crm records share Leads 5437280000000328001 add -d \'{"share_to":{"id":"5437280000000200001"},"permission":"read_write"}\'',
    'zoho crm records share Leads 5437280000000328001 revoke --share-id 5437280000000400001',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
    action: Args.string({ description: 'Action to perform', required: true, options: ['list', 'add', 'update', 'revoke'] }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON sharing data (required for add/update)', char: 'd' }),
    'share-id': Flags.string({ description: 'Share ID (required for revoke)' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const basePath = `/${args.module}/${args.id}/actions/share`

    try {
      switch (args.action) {
        case 'list': {
          const { data } = await this.apiClient.get(basePath)

          this.outputSuccess(data.share ?? data.data ?? data, {
            module: args.module,
            action: 'share-list',
          })
          return
        }

        case 'add': {
          if (!flags.data) {
            this.outputError('MISSING_DATA', 'The --data flag is required for share add')
            this.exit(2)
          }

          const body = JSON.parse(flags.data!)
          const { data } = await this.apiClient.post(basePath, body)

          this.outputSuccess(data.share?.[0] ?? data.data?.[0] ?? data, {
            module: args.module,
            action: 'share-add',
          })
          return
        }

        case 'update': {
          if (!flags.data) {
            this.outputError('MISSING_DATA', 'The --data flag is required for share update')
            this.exit(2)
          }

          const body = JSON.parse(flags.data!)
          const { data } = await this.apiClient.put(basePath, body)

          this.outputSuccess(data.share?.[0] ?? data.data?.[0] ?? data, {
            module: args.module,
            action: 'share-update',
          })
          return
        }

        case 'revoke': {
          if (!flags['share-id']) {
            this.outputError('MISSING_SHARE_ID', 'The --share-id flag is required for share revoke')
            this.exit(2)
          }

          const { data } = await this.apiClient.delete(`${basePath}/${flags['share-id']}`)

          this.outputSuccess(data.data?.[0] ?? data, {
            module: args.module,
            action: 'share-revoke',
          })
          return
        }
      }
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
