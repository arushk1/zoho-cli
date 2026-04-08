import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../crm-base-command.js'

export default class CrmQuery extends CrmBaseCommand<typeof CrmQuery> {
  static id = 'crm query'
  static summary = 'Execute a COQL query'
  static examples = [
    'zoho crm query --sql "SELECT Last_Name, Email FROM Contacts WHERE Last_Name = \'Smith\'"',
    'zoho crm query --sql "SELECT Deal_Name, Amount FROM Deals ORDER BY Amount DESC LIMIT 10"',
    'zoho crm query --sql "SELECT Last_Name FROM Leads WHERE Lead_Source = \'Web\' ORDER BY Created_Time LIMIT 50"',
  ]

  static flags = {
    sql: Flags.string({ description: 'The COQL query string', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.post('/coql', {
        select_query: flags.sql,
      })

      this.outputSuccess(data.data ?? [], {
        action: 'query',
        hasMore: data.info?.more_records ?? false,
        count: data.data?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
