import { describe, it, expect } from 'vitest'
import IssuesList from '../../../src/commands/projects/issues/list.js'
import IssuesGet from '../../../src/commands/projects/issues/get.js'
import IssuesCreate from '../../../src/commands/projects/issues/create.js'
import IssuesUpdate from '../../../src/commands/projects/issues/update.js'
import IssuesDelete from '../../../src/commands/projects/issues/delete.js'
import IssuesMove from '../../../src/commands/projects/issues/move.js'
import IssuesClone from '../../../src/commands/projects/issues/clone.js'

describe('projects issues list', () => {
  it('has correct command metadata', () => {
    expect(IssuesList.id).toBe('projects issues list')
  })

  it('has a summary', () => {
    expect(IssuesList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(IssuesList.flags.project.required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(IssuesList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((IssuesList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(IssuesList.flags['per-page']).toBeDefined()
  })

  it('supports --severity filter flag', () => {
    expect(IssuesList.flags.severity).toBeDefined()
  })

  it('supports --status filter flag', () => {
    expect(IssuesList.flags.status).toBeDefined()
  })

  it('supports --assignee filter flag', () => {
    expect(IssuesList.flags.assignee).toBeDefined()
  })

  it('supports --sort-by flag', () => {
    expect(IssuesList.flags['sort-by']).toBeDefined()
  })

  it('supports --sort-order flag', () => {
    expect(IssuesList.flags['sort-order']).toBeDefined()
  })
})

describe('projects issues get', () => {
  it('has correct command metadata', () => {
    expect(IssuesGet.id).toBe('projects issues get')
  })

  it('has a summary', () => {
    expect(IssuesGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(IssuesGet.args.id.required).toBe(true)
  })
})

describe('projects issues create', () => {
  it('has correct command metadata', () => {
    expect(IssuesCreate.id).toBe('projects issues create')
  })

  it('has a summary', () => {
    expect(IssuesCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(IssuesCreate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(IssuesCreate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(IssuesCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((IssuesCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects issues update', () => {
  it('has correct command metadata', () => {
    expect(IssuesUpdate.id).toBe('projects issues update')
  })

  it('has a summary', () => {
    expect(IssuesUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(IssuesUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(IssuesUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(IssuesUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((IssuesUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects issues delete', () => {
  it('has correct command metadata', () => {
    expect(IssuesDelete.id).toBe('projects issues delete')
  })

  it('has a summary', () => {
    expect(IssuesDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(IssuesDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(IssuesDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((IssuesDelete.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects issues move', () => {
  it('has correct command metadata', () => {
    expect(IssuesMove.id).toBe('projects issues move')
  })

  it('has a summary', () => {
    expect(IssuesMove.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(IssuesMove.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(IssuesMove.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(IssuesMove.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((IssuesMove.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects issues clone', () => {
  it('has correct command metadata', () => {
    expect(IssuesClone.id).toBe('projects issues clone')
  })

  it('has a summary', () => {
    expect(IssuesClone.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(IssuesClone.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(IssuesClone.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((IssuesClone.flags['dry-run'] as any).default).toBe(false)
  })
})
