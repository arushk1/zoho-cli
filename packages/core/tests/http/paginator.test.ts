import { describe, it, expect, vi } from 'vitest'
import { paginate } from '../../src/http/index.js'

describe('Paginator', () => {
  it('collects all pages', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }], info: { more_records: true, page: 1 } })
      .mockResolvedValueOnce({ data: [{ id: 3 }], info: { more_records: false, page: 2 } })

    const results = await paginate(fetcher)
    expect(results).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(fetcher).toHaveBeenCalledWith(1)
    expect(fetcher).toHaveBeenCalledWith(2)
  })

  it('handles single page', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ data: [{ id: 1 }], info: { more_records: false, page: 1 } })

    const results = await paginate(fetcher)
    expect(results).toEqual([{ id: 1 }])
    expect(fetcher).toHaveBeenCalledTimes(1)
  })

  it('handles empty response', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ data: [], info: { more_records: false, page: 1 } })

    const results = await paginate(fetcher)
    expect(results).toEqual([])
  })
})
