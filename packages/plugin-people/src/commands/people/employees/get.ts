import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleEmployeesGet extends PeopleBaseCommand<typeof PeopleEmployeesGet> {
  static id = 'people employees get'
  static summary = 'Get a single employee record by ID'
  static examples = [
    'zoho people employees get 12345',
  ]

  static args = {
    id: Args.string({ description: 'Employee record ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.formGetById('employee', args.id)
      this.outputSuccess(result, { action: 'employees.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
