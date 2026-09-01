import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

/**
 * Parse repeatable `--param key=value` flags. Splits on the FIRST `=` only, so a
 * value may itself contain `=`. A flag with no `=` or an empty key is rejected.
 */
export function parseParams(raw: string[] | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  for (const item of raw ?? []) {
    const eq = item.indexOf('=')
    if (eq <= 0) throw new Error(`--param expects key=value, got "${item}"`)
    out[item.slice(0, eq)] = item.slice(eq + 1)
  }
  return out
}

/** Strip Zoho's `code`/`message` envelope fields; what remains is the payload. */
export function stripEnvelope(body: unknown): unknown {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) return body
  const { code: _code, message: _message, ...rest } = body as Record<string, unknown>
  return rest
}

export default class PayRawGet extends PaymentsBaseCommand<typeof PayRawGet> {
  static id = 'payments raw get'
  static summary = 'GET any Zoho Payments API path with account_id appended'
  static description = 'Authenticated passthrough for endpoints this CLI does not wrap yet (Zoho documents no list endpoints for refunds, payment links, customers, or mandates). Read-only.'
  static examples = [
    '<%= config.bin %> payments raw get /payouts/123/transactions --param per_page=200',
  ]

  static args = {
    path: Args.string({ description: 'API path relative to /api/v1, starting with /', required: true }),
  }

  static flags = {
    param: Flags.string({ description: 'Query parameter as key=value (repeatable)', multiple: true }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    if (!args.path.startsWith('/')) {
      this.outputError('INVALID_PATH', `path must start with "/", got "${args.path}"`)
      this.exit(2)
    }
    let params: Record<string, string>
    try {
      params = parseParams(flags.param)
    } catch (error: any) {
      this.outputError('INVALID_PARAM', error.message)
      this.exit(2)
    }
    try {
      const body = await this.paymentsGet<any>(args.path, params)
      const code = body?.code
      if (typeof code === 'number' && code !== 0) {
        this.outputError(String(code), body.message ?? 'Zoho returned a non-zero code', String(code))
        this.exit(1)
      }
      this.outputSuccess(stripEnvelope(body), { action: 'payments.raw.get', path: args.path } as any)
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
