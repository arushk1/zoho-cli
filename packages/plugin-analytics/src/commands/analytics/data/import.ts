import { Flags } from '@oclif/core'
import FormData from 'form-data'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { extname } from 'node:path'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'
import { splitList } from '../../../analytics-utils.js'

// Synchronous import caps the file at 20 MB; larger files need Zoho's bulk import API.
const MAX_IMPORT_BYTES = 20 * 1024 * 1024

export default class AnalyticsDataImport extends AnalyticsBaseCommand<typeof AnalyticsDataImport> {
  static id = 'analytics data import'
  static summary = 'Import a CSV or JSON file into an existing table (--view) or a new table (--table-name)'
  static examples = [
    '<%= config.bin %> analytics data import -w <workspace-id> --view <view-id> --file sales.csv --import-type append',
    '<%= config.bin %> analytics data import -w <workspace-id> --view <view-id> --file sales.csv --import-type updateadd --matching-columns OrderId',
    '<%= config.bin %> analytics data import -w <workspace-id> --table-name Sales2026 --file sales.json',
  ]

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    view: Flags.string({ description: 'Existing table (view) ID to import into', exclusive: ['table-name'] }),
    'table-name': Flags.string({ description: 'Create a new table with this name from the file', exclusive: ['view', 'import-type', 'matching-columns'] }),
    file: Flags.string({ description: 'Path to the CSV or JSON file (max 20 MB)', required: true, char: 'f' }),
    'import-type': Flags.string({ description: 'How to merge into an existing table (default append)', options: ['append', 'truncateadd', 'updateadd'] }),
    'file-type': Flags.string({ description: 'File type (defaults to the file extension, else csv)', options: ['csv', 'json'] }),
    'matching-columns': Flags.string({ description: 'Comma-separated key columns; required for --import-type updateadd' }),
    'auto-identify': Flags.boolean({ description: 'Let Zoho detect delimiter, quoting and column types', default: true, allowNo: true }),
    'on-error': Flags.string({ description: 'What to do with rows that fail to import', options: ['abort', 'skiprow', 'setcolumnempty'] }),
    'date-format': Flags.string({ description: 'Date format used in the file (e.g. dd-MMM-yyyy)' }),
    config: Flags.string({ description: 'Extra CONFIG keys as a JSON object (e.g. delimiter, quoted, columnDataTypes)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    if (!flags.view && !flags['table-name']) {
      this.outputError('MISSING_TARGET', 'Pass --view to import into an existing table, or --table-name to create a new one')
      this.exit(3)
    }
    const importType = flags['table-name'] ? undefined : (flags['import-type'] ?? 'append')
    const matchingColumns = splitList(flags['matching-columns'])
    if (importType === 'updateadd' && !matchingColumns) {
      this.outputError('MISSING_MATCHING_COLUMNS', '--matching-columns is required with --import-type updateadd')
      this.exit(3)
    }

    let size: number
    try {
      size = (await stat(flags.file)).size
    } catch (error: any) {
      this.outputError('FILE_NOT_FOUND', `Cannot read --file: ${error.message}`)
      this.exit(3)
    }
    if (size > MAX_IMPORT_BYTES) {
      this.outputError('FILE_TOO_LARGE', `File is ${size} bytes; synchronous import accepts at most 20 MB`)
      this.exit(3)
    }

    const ext = extname(flags.file).toLowerCase()
    const fileType = flags['file-type'] ?? (ext === '.json' ? 'json' : 'csv')
    const extra = flags.config ? this.parseJsonFlag<Record<string, unknown>>(flags.config, 'config') : {}
    const fromFlags = {
      importType,
      tableName: flags['table-name'],
      fileType,
      autoIdentify: flags['auto-identify'],
      matchingColumns,
      onError: flags['on-error'],
      dateFormat: flags['date-format'],
    }
    // Flags override --config, but unset flags must not erase keys passed via --config.
    const config = { ...extra, ...Object.fromEntries(Object.entries(fromFlags).filter(([, v]) => v !== undefined)) }
    const path = flags.view
      ? `/workspaces/${flags.workspace}/views/${flags.view}/data`
      : `/workspaces/${flags.workspace}/data`

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, config, file: flags.file, bytes: size })
        return
      }
      const form = new FormData()
      form.append('FILE', createReadStream(flags.file))
      const data = await this.analyticsUpload(path, form, config)
      this.outputSuccess(data, { action: 'analytics.data.import' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
