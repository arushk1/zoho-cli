import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmAccountsCreate extends CrmBaseCommand<typeof CrmAccountsCreate> {
  static id = 'crm accounts create'
  static summary = 'Create a new Account'
  static examples = ['zoho crm accounts create --json \'{"Account_Name":"Acme Inc"}\'']

  static flags = {
    json: Flags.string({ description: 'JSON object with record fields', char: 'j' }),
    data: Flags.string({ description: 'Alias for --json', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordCreate('Accounts', this.flags.json ?? this.flags.data, this.flags['dry-run'])
  }
}
