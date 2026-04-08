import { Flags } from '@oclif/core'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { basename } from 'node:path'
import FormData from 'form-data'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleFilesUpload extends PeopleBaseCommand<typeof PeopleFilesUpload> {
  static id = 'people files upload'
  static summary = 'Upload a file'
  static examples = ['zoho people files upload --file ./document.pdf']

  static flags = {
    file: Flags.string({ description: 'Path to file to upload', required: true }),
    employee: Flags.string({ description: 'Employee ID to associate file with' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const fileStat = await stat(flags.file).catch(() => null)
      if (!fileStat) {
        this.outputError('FILE_NOT_FOUND', `File not found: ${flags.file}`)
        this.exit(3)
      }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/people/api/files/uploadFileMultipart', file: flags.file })
        return
      }
      const form = new FormData()
      form.append('filename', createReadStream(flags.file), basename(flags.file))
      if (flags.employee) form.append('employeeId', flags.employee)
      const { data } = await this.apiClient.post('/people/api/files/uploadFileMultipart', form, { headers: form.getHeaders() })
      this.outputSuccess(this.extractResult(data), { action: 'files.upload' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
