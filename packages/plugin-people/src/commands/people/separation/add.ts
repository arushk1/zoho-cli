import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleSeparationAdd extends PeopleBaseCommand<typeof PeopleSeparationAdd> {
  static id = 'people separation add'
  static summary = 'Add a separation/exit record'
  static examples = ['zoho people separation add --data \'{"Employee_ID":"12345","Resignation_Date":"2026-04-15"}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with separation fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const sepData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', form: 'P_Separation', body: sepData })
        return
      }
      const result = await this.formInsert('P_Separation', sepData)
      this.outputSuccess(result, { action: 'separation.add' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
