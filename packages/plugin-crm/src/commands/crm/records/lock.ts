import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsLock extends CrmBaseCommand<typeof CrmRecordsLock> {
  static id = 'crm records lock'
  static summary = 'Get, lock, or unlock a record'
  static examples = [
    'zoho crm records lock Leads 5437280000000328001 get',
    'zoho crm records lock Leads 5437280000000328001 lock -d \'{"Locked_Reason__s":"Under review"}\'',
    'zoho crm records lock Leads 5437280000000328001 unlock --lock-id 5437280000000500001',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
    action: Args.string({ description: 'Action to perform', required: true, options: ['get', 'lock', 'unlock'] }),
  }

  static flags = {
    'lock-id': Flags.string({ description: 'Lock ID (required for unlock)' }),
    data: Flags.string({ description: 'JSON lock data (e.g., locked reason)', char: 'd' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const basePath = `/${args.module}/${args.id}/Locking_Information__s`

    try {
      switch (args.action) {
        case 'get': {
          const { data } = await this.apiClient.get(basePath, {
            params: { fields: 'id,Locked_Reason__s,Lock_Action__s,Created_Time,Created_By' },
          })

          // 204 No Content means record is not locked
          this.outputSuccess(data?.data ?? [], {
            module: args.module,
            action: 'lock-get',
          })
          return
        }

        case 'lock': {
          const lockData = flags.data ? JSON.parse(flags.data) : {}
          const body = { data: [lockData] }
          const { data } = await this.apiClient.post(basePath, body)

          this.outputSuccess(data.data?.[0] ?? data, {
            module: args.module,
            action: 'lock',
          })
          return
        }

        case 'unlock': {
          if (!flags['lock-id']) {
            this.outputError('MISSING_LOCK_ID', 'The --lock-id flag is required for unlock')
            this.exit(2)
          }

          const { data } = await this.apiClient.delete(`${basePath}/${flags['lock-id']}`)

          this.outputSuccess(data.data?.[0] ?? data, {
            module: args.module,
            action: 'unlock',
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
