export interface PageResponse<T> {
  data: T[]
  info: {
    more_records: boolean
    page: number
  }
}

export type PageFetcher<T> = (page: number) => Promise<PageResponse<T>>

export async function paginate<T>(fetcher: PageFetcher<T>): Promise<T[]> {
  const results: T[] = []
  let page = 1

  while (true) {
    const response = await fetcher(page)
    results.push(...response.data)
    if (!response.info.more_records) break
    page++
  }

  return results
}
