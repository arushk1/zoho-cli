import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleEmployeesList extends PeopleBaseCommand<typeof PeopleEmployeesList> {
  static id = 'people employees list'
  static summary = 'List employee records'
  static examples = [
    'zoho people employees list',
    'zoho people employees list --page 2 --per-page 50',
    'zoho people employees list --modified-since 2024-01-01',
  ]

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 200)', default: 200 }),
    'modified-since': Flags.string({ description: 'Filter by modification date (e.g. 2024-01-01)' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const sIndex = ((flags.page - 1) * flags['per-page']) + 1
      const params: Record<string, string> = {
        sIndex: String(sIndex),
        limit: String(flags['per-page']),
      }

      if (flags['modified-since']) {
        params.modifiedtime = flags['modified-since']
      }

      const { data } = await this.apiClient.get('/people/api/forms/employee/getRecords', { params })
      this.outputSuccess(this.extractResult(data), {
        action: 'employees.list',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
