import { describe, it, expect } from 'vitest'
import PortalsList from '../../../src/commands/projects/portals/list.js'
import PortalsGet from '../../../src/commands/projects/portals/get.js'

describe('projects portals list', () => {
  it('has correct command metadata', () => {
    expect(PortalsList.id).toBe('projects portals list')
  })

  it('has a summary', () => {
    expect(PortalsList.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(PortalsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((PortalsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(PortalsList.flags['per-page']).toBeDefined()
  })
})

describe('projects portals get', () => {
  it('has correct command metadata', () => {
    expect(PortalsGet.id).toBe('projects portals get')
  })

  it('has a summary', () => {
    expect(PortalsGet.summary).toBeTruthy()
  })
})
