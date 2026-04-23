export function serializeBookingsForm(fields: Record<string, unknown>): URLSearchParams {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue
    if (typeof value === 'object') {
      params.append(key, JSON.stringify(value))
    } else {
      params.append(key, String(value))
    }
  }
  return params
}
