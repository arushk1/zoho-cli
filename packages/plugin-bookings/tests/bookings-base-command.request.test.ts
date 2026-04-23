import { describe, it, expect, vi } from 'vitest'
import { BookingsBaseCommand } from '../src/bookings-base-command.js'

class HarnessCommand extends BookingsBaseCommand<typeof HarnessCommand> {
  static id = 'bookings harness'
  async run(): Promise<void> {
    /* never called */
  }
}

function makeHarness(mockClient: any) {
  const cmd = Object.create(HarnessCommand.prototype) as any
  Object.defineProperty(cmd, 'apiClient', { get: () => mockClient, configurable: true })
  cmd.flags = {}
  return cmd
}

describe('BookingsBaseCommand.bookingsGet', () => {
  it('calls /json/<action> and unwraps success envelope', async () => {
    const get = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: { id: '1' }, logMessage: [], status: 'success' } },
    })
    const cmd = makeHarness({ get })
    const result = await cmd.bookingsGet('workspaces', { workspace_id: 'ws_1' })
    expect(get).toHaveBeenCalledWith('/json/workspaces', { params: { workspace_id: 'ws_1' } })
    expect(result).toEqual({ id: '1' })
  })

  it('omits undefined query params', async () => {
    const get = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: [], logMessage: [], status: 'success' } },
    })
    const cmd = makeHarness({ get })
    await cmd.bookingsGet('services', { workspace_id: 'ws_1', staff_id: undefined })
    expect(get).toHaveBeenCalledWith('/json/services', { params: { workspace_id: 'ws_1' } })
  })

  it('passes no params when none are provided', async () => {
    const get = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: [], logMessage: [], status: 'success' } },
    })
    const cmd = makeHarness({ get })
    await cmd.bookingsGet('workspaces')
    expect(get).toHaveBeenCalledWith('/json/workspaces', { params: {} })
  })

  it('throws BookingsApiError on non-success envelope', async () => {
    const get = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: {}, logMessage: ['nope'], status: 'failure' } },
    })
    const cmd = makeHarness({ get })
    await expect(cmd.bookingsGet('workspaces')).rejects.toMatchObject({
      isBookingsApiError: true,
      message: 'nope',
    })
  })
})

describe('BookingsBaseCommand.bookingsPostForm', () => {
  it('serializes nested objects as JSON fields in urlencoded body', async () => {
    const post = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: { booking_id: 'b1' }, logMessage: [], status: 'success' } },
    })
    const cmd = makeHarness({ post })
    const result = await cmd.bookingsPostForm('appointment', {
      service_id: 'svc1',
      customer_details: { name: 'A', email: 'a@x' },
    })
    expect(post).toHaveBeenCalled()
    const [path, body, config] = post.mock.calls[0]
    expect(path).toBe('/json/appointment')
    expect(typeof body).toBe('string')
    expect(body).toContain('service_id=svc1')
    expect(body).toContain('customer_details=' + encodeURIComponent('{"name":"A","email":"a@x"}'))
    expect(config.headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    expect(result).toEqual({ booking_id: 'b1' })
  })

  it('skips null and undefined fields', async () => {
    const post = vi.fn().mockResolvedValue({
      data: { response: { returnvalue: {}, logMessage: [], status: 'success' } },
    })
    const cmd = makeHarness({ post })
    await cmd.bookingsPostForm('createworkspace', { name: 'A', notes: null, extra: undefined })
    const [, body] = post.mock.calls[0]
    expect(body).toBe('name=A')
  })
})
