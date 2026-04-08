import { Flags } from '@oclif/core'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { basename } from 'node:path'
import FormData from 'form-data'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsAttachmentsUpload extends ProjectsBaseCommand<typeof ProjectsAttachmentsUpload> {
  static id = 'projects attachments upload'
  static summary = 'Upload a file attachment to a project'
  static examples = ['zoho projects attachments upload --project 12345 --file ./document.pdf']

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    file: Flags.string({ description: 'Path to the file to upload', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'POST', path: await this.projectPath(flags.project, '/attachments'), file: flags.file })
        return
      }

      const form = new FormData()
      form.append('uploaddoc', createReadStream(flags.file), basename(flags.file))

      const { data } = await this.apiClient.post(
        await this.projectPath(flags.project, '/attachments'),
        form,
        { headers: form.getHeaders() },
      )
      this.outputSuccess(data.attachments?.[0] ?? data, { action: 'attachments.upload' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
