import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmContactsCreate extends CrmBaseCommand<typeof CrmContactsCreate> {
  static id = 'crm contacts create'
  static summary = 'Create a new Contact'
  static examples = ['zoho crm contacts create --json \'{"Last_Name":"Smith","Email":"s@x.com"}\'']

  static flags = {
    json: Flags.string({ description: 'JSON object with record fields', char: 'j' }),
    data: Flags.string({ description: 'Alias for --json', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordCreate('Contacts', this.flags.json ?? this.flags.data, this.flags['dry-run'])
  }
}
