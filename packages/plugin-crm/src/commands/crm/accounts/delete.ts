import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmAccountsDelete extends CrmBaseCommand<typeof CrmAccountsDelete> {
  static id = 'crm accounts delete'
  static summary = 'Delete an Account by ID'
  static examples = ['zoho crm accounts delete --id 5437280000000328001']

  static flags = {
    id: Flags.string({ description: 'Record ID', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    await this.runRecordDelete('Accounts', this.flags.id, this.flags['dry-run'])
  }
}
