import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmScoringRulesList extends CrmBaseCommand<typeof CrmScoringRulesList> {
  static id = 'crm scoring-rules list'
  static summary = 'List all CRM scoring rules'
  static examples = ['zoho crm scoring-rules list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/settings/scoring_rules')

      const scoringRules = data.scoring_rules ?? []

      this.outputSuccess(scoringRules, {
        action: 'scoring-rules.list',
        count: scoringRules.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
