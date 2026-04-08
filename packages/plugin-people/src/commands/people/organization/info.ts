import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleOrganizationInfo extends PeopleBaseCommand<typeof PeopleOrganizationInfo> {
  static id = 'people organization info'
  static summary = 'Get organization information'
  static examples = ['zoho people organization info']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/api/v3/organization')
      this.outputSuccess(data, { action: 'organization.info' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
