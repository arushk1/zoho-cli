import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleEmployeesSearch extends PeopleBaseCommand<typeof PeopleEmployeesSearch> {
  static id = 'people employees search'
  static summary = 'Search employee records'
  static examples = [
    'zoho people employees search --search-params \'[{"searchField":"Department","searchOperator":"Is","searchText":"Engineering"}]\'',
  ]

  static flags = {
    'search-params': Flags.string({ description: 'JSON array of search criteria', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      let parsed: object[]
      try {
        parsed = JSON.parse(flags['search-params'])
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --search-params flag')
          this.exit(3)
        }
        throw error
      }

      const sIndex = ((flags.page - 1) * flags['per-page']) + 1
      const result = await this.formSearch('employee', parsed, { sIndex, limit: flags['per-page'] })
      this.outputSuccess(result, {
        action: 'employees.search',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
