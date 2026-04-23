import { describe, it, expect, vi } from 'vitest'
import { BookingsBaseCommand } from '../src/bookings-base-command.js'

class HarnessCommand extends BookingsBaseCommand<typeof HarnessCommand> {
  static id = 'bookings harness'
  async run(): Promise<void> {}
}

function makeHarness({
  flags = {},
  config = {},
  apiGet,
}: {
  flags?: Record<string, unknown>
  config?: Record<string, unknown>
  apiGet?: (path: string, opts: any) => Promise<any>
}) {
  const cmd = Object.create(HarnessCommand.prototype) as any
  cmd.flags = flags
  cmd.zohoConfig = config
  const mockClient = {
    get: apiGet ?? vi.fn(),
    post: vi.fn(),
  }
  Object.defineProperty(cmd, 'apiClient', { get: () => mockClient, configurable: true })
  const errors: Array<{ code: string; message: string }> = []
  cmd.outputError = (code: string, message: string) => errors.push({ code, message })
  cmd.exit = (n: number) => {
    const e: any = new Error(`exit ${n}`)
    e.oclifExit = n
    throw e
  }
  cmd._errors = errors
  return cmd
}

describe('resolveWorkspaceId', () => {
  it('returns flag value when present', async () => {
    const cmd = makeHarness({ flags: { workspace: 'ws_from_flag' }, config: { defaultBookingsWorkspace: 'ws_cfg' } })
    await expect(cmd.resolveWorkspaceId()).resolves.toBe('ws_from_flag')
  })

  it('falls back to config when flag missing', async () => {
    const cmd = makeHarness({ flags: {}, config: { defaultBookingsWorkspace: 'ws_cfg' } })
    await expect(cmd.resolveWorkspaceId()).resolves.toBe('ws_cfg')
  })

  it('auto-detects via API when neither flag nor config set', async () => {
    const apiGet = vi.fn().mockResolvedValue({
      data: {
        response: {
          returnvalue: { data: [{ id: 'ws_auto', name: 'Default' }] },
          logMessage: [],
          status: 'success',
        },
      },
    })
    const cmd = makeHarness({ flags: {}, config: {}, apiGet })
    await expect(cmd.resolveWorkspaceId()).resolves.toBe('ws_auto')
    expect(apiGet).toHaveBeenCalledWith('/json/workspaces', { params: {} })
  })

  it('handles alternate envelope shape where returnvalue IS the list', async () => {
    const apiGet = vi.fn().mockResolvedValue({
      data: {
        response: {
          returnvalue: [{ id: 'ws_alt', name: 'Alt' }],
          logMessage: [],
          status: 'success',
        },
      },
    })
    const cmd = makeHarness({ flags: {}, config: {}, apiGet })
    await expect(cmd.resolveWorkspaceId()).resolves.toBe('ws_alt')
  })

  it('emits NO_WORKSPACES and exits 3 when API returns empty list', async () => {
    const apiGet = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: { data: [] }, logMessage: [], status: 'success' } },
    })
    const cmd = makeHarness({ flags: {}, config: {}, apiGet })
    await expect(cmd.resolveWorkspaceId()).rejects.toThrow('exit 3')
    expect(cmd._errors).toEqual([{ code: 'NO_WORKSPACES', message: expect.stringContaining('No Zoho Bookings workspaces found') }])
  })

  it('memoizes the resolved value', async () => {
    const apiGet = vi.fn().mockResolvedValue({
      data: {
        response: {
          returnvalue: { data: [{ id: 'ws_memo' }] },
          logMessage: [],
          status: 'success',
        },
      },
    })
    const cmd = makeHarness({ flags: {}, config: {}, apiGet })
    await cmd.resolveWorkspaceId()
    await cmd.resolveWorkspaceId()
    expect(apiGet).toHaveBeenCalledTimes(1)
  })
})
