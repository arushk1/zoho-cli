import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFilesAddFolder extends PeopleBaseCommand<typeof PeopleFilesAddFolder> {
  static id = 'people files add-folder'
  static summary = 'Create a new folder'
  static examples = ['zoho people files add-folder --data \'{"folderName":"HR Documents"}\'']

  static flags = {
    data: Flags.string({ description: 'JSON object with folder fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const folderData = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/api/files/addFolder', body: folderData })
        return
      }
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(folderData)) {
        params.append(key, String(value))
      }
      const { data } = await this.apiClient.post('/api/files/addFolder', params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      this.outputSuccess(this.extractResult(data), { action: 'files.add-folder' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
