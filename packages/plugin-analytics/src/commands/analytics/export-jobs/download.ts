import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'
import { EXPORT_FORMATS, type ExportFormat } from '../../../analytics-utils.js'

export default class AnalyticsExportJobsDownload extends AnalyticsBaseCommand<typeof AnalyticsExportJobsDownload> {
  static id = 'analytics export-jobs download'
  static summary = 'Download the result of a completed bulk export job (available for 1 hour)'

  static args = {
    id: Args.string({ description: 'Export job ID', required: true }),
  }

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    format: Flags.string({ description: 'Format the job was created with (controls how output is decoded)', options: [...EXPORT_FORMATS], default: 'json' }),
    output: Flags.string({ description: 'Write the result to this file instead of stdout', char: 'o' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = await this.analyticsDownload(`/bulk/workspaces/${flags.workspace}/exportjobs/${args.id}/data`)
      await this.emitExport(body, flags.format as ExportFormat, flags.output, { action: 'analytics.export-jobs.download' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
