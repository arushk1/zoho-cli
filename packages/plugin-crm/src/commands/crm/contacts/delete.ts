import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmContactsDelete extends CrmBaseCommand<typeof CrmContactsDelete> {
  static id = 'crm contacts delete'
  static summary = 'Delete a Contact by ID'
  static examples = ['zoho crm contacts delete --id 5437280000000328001']

  static flags = {
    id: Flags.string({ description: 'Record ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordDelete('Contacts', this.flags.id, this.flags['dry-run'])
  }
}
