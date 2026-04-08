import { describe, it, expect } from 'vitest'
import { CrmBaseCommand } from '../../../../src/crm-base-command.js'
import CrmRecordsList from '../../../../src/commands/crm/records/list.js'
import CrmRecordsGet from '../../../../src/commands/crm/records/get.js'
import CrmRecordsCreate from '../../../../src/commands/crm/records/create.js'
import CrmRecordsUpdate from '../../../../src/commands/crm/records/update.js'
import CrmRecordsDelete from '../../../../src/commands/crm/records/delete.js'
import CrmRecordsUpsert from '../../../../src/commands/crm/records/upsert.js'
import CrmRecordsSearch from '../../../../src/commands/crm/records/search.js'
import CrmRecordsClone from '../../../../src/commands/crm/records/clone.js'
import CrmRecordsCount from '../../../../src/commands/crm/records/count.js'
import CrmRecordsDeleted from '../../../../src/commands/crm/records/deleted.js'
import CrmRecordsTimeline from '../../../../src/commands/crm/records/timeline.js'
import CrmRecordsBlueprint from '../../../../src/commands/crm/records/blueprint.js'
import CrmRecordsChangeOwner from '../../../../src/commands/crm/records/change-owner.js'
import CrmRecordsMerge from '../../../../src/commands/crm/records/merge.js'
import CrmRecordsShare from '../../../../src/commands/crm/records/share.js'
import CrmRecordsLock from '../../../../src/commands/crm/records/lock.js'
import CrmRecordsMassUpdate from '../../../../src/commands/crm/records/mass-update.js'
import CrmRecordsMassDelete from '../../../../src/commands/crm/records/mass-delete.js'

// ---------------------------------------------------------------------------
// crm records list
// ---------------------------------------------------------------------------
describe('crm records list', () => {
  it('has correct command id', () => {
    expect(CrmRecordsList.id).toBe('crm records list')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsList.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsList)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsList.args.module).toBeDefined()
    expect(CrmRecordsList.args.module.required).toBe(true)
  })

  it('supports --fields flag', () => {
    expect(CrmRecordsList.flags.fields).toBeDefined()
  })

  it('supports --sort-by flag', () => {
    expect(CrmRecordsList.flags['sort-by']).toBeDefined()
  })

  it('supports --sort-order flag', () => {
    expect(CrmRecordsList.flags['sort-order']).toBeDefined()
  })

  it('supports --page flag with default 1', () => {
    expect(CrmRecordsList.flags.page).toBeDefined()
    expect(CrmRecordsList.flags.page.default).toBe(1)
  })

  it('supports --per-page flag with default 200', () => {
    expect(CrmRecordsList.flags['per-page']).toBeDefined()
    expect(CrmRecordsList.flags['per-page'].default).toBe(200)
  })

  it('does not have a --dry-run flag (read command)', () => {
    expect(CrmRecordsList.flags['dry-run']).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// crm records get
// ---------------------------------------------------------------------------
describe('crm records get', () => {
  it('has correct command id', () => {
    expect(CrmRecordsGet.id).toBe('crm records get')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsGet.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsGet)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsGet.args.module).toBeDefined()
    expect(CrmRecordsGet.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsGet.args.id).toBeDefined()
    expect(CrmRecordsGet.args.id.required).toBe(true)
  })

  it('supports --fields flag', () => {
    expect(CrmRecordsGet.flags.fields).toBeDefined()
  })

  it('does not have a --dry-run flag (read command)', () => {
    expect(CrmRecordsGet.flags['dry-run']).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// crm records create
// ---------------------------------------------------------------------------
describe('crm records create', () => {
  it('has correct command id', () => {
    expect(CrmRecordsCreate.id).toBe('crm records create')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsCreate.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsCreate)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsCreate.args.module).toBeDefined()
    expect(CrmRecordsCreate.args.module.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CrmRecordsCreate.flags.data).toBeDefined()
    expect(CrmRecordsCreate.flags.data.required).toBe(true)
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsCreate.flags.data.char).toBe('d')
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsCreate.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records update
// ---------------------------------------------------------------------------
describe('crm records update', () => {
  it('has correct command id', () => {
    expect(CrmRecordsUpdate.id).toBe('crm records update')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsUpdate.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsUpdate)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsUpdate.args.module).toBeDefined()
    expect(CrmRecordsUpdate.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsUpdate.args.id).toBeDefined()
    expect(CrmRecordsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CrmRecordsUpdate.flags.data).toBeDefined()
    expect(CrmRecordsUpdate.flags.data.required).toBe(true)
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsUpdate.flags.data.char).toBe('d')
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsUpdate.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records delete
// ---------------------------------------------------------------------------
describe('crm records delete', () => {
  it('has correct command id', () => {
    expect(CrmRecordsDelete.id).toBe('crm records delete')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsDelete.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsDelete)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsDelete.args.module).toBeDefined()
    expect(CrmRecordsDelete.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsDelete.args.id).toBeDefined()
    expect(CrmRecordsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsDelete.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records upsert
// ---------------------------------------------------------------------------
describe('crm records upsert', () => {
  it('has correct command id', () => {
    expect(CrmRecordsUpsert.id).toBe('crm records upsert')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsUpsert.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsUpsert)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsUpsert.args.module).toBeDefined()
    expect(CrmRecordsUpsert.args.module.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CrmRecordsUpsert.flags.data).toBeDefined()
    expect(CrmRecordsUpsert.flags.data.required).toBe(true)
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsUpsert.flags.data.char).toBe('d')
  })

  it('requires --duplicate-check-fields flag', () => {
    expect(CrmRecordsUpsert.flags['duplicate-check-fields']).toBeDefined()
    expect(CrmRecordsUpsert.flags['duplicate-check-fields'].required).toBe(true)
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsUpsert.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsUpsert.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records search
// ---------------------------------------------------------------------------
describe('crm records search', () => {
  it('has correct command id', () => {
    expect(CrmRecordsSearch.id).toBe('crm records search')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsSearch.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsSearch)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsSearch.args.module).toBeDefined()
    expect(CrmRecordsSearch.args.module.required).toBe(true)
  })

  it('supports --criteria flag', () => {
    expect(CrmRecordsSearch.flags.criteria).toBeDefined()
  })

  it('supports --email flag', () => {
    expect(CrmRecordsSearch.flags.email).toBeDefined()
  })

  it('supports --phone flag', () => {
    expect(CrmRecordsSearch.flags.phone).toBeDefined()
  })

  it('supports --word flag', () => {
    expect(CrmRecordsSearch.flags.word).toBeDefined()
  })

  it('supports --fields flag', () => {
    expect(CrmRecordsSearch.flags.fields).toBeDefined()
  })

  it('supports --page flag with default 1', () => {
    expect(CrmRecordsSearch.flags.page).toBeDefined()
    expect(CrmRecordsSearch.flags.page.default).toBe(1)
  })

  it('supports --per-page flag with default 200', () => {
    expect(CrmRecordsSearch.flags['per-page']).toBeDefined()
    expect(CrmRecordsSearch.flags['per-page'].default).toBe(200)
  })

  it('does not have --dry-run flag (read command)', () => {
    expect(CrmRecordsSearch.flags['dry-run']).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// crm records clone
// ---------------------------------------------------------------------------
describe('crm records clone', () => {
  it('has correct command id', () => {
    expect(CrmRecordsClone.id).toBe('crm records clone')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsClone.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsClone)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsClone.args.module).toBeDefined()
    expect(CrmRecordsClone.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsClone.args.id).toBeDefined()
    expect(CrmRecordsClone.args.id.required).toBe(true)
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsClone.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsClone.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records count
// ---------------------------------------------------------------------------
describe('crm records count', () => {
  it('has correct command id', () => {
    expect(CrmRecordsCount.id).toBe('crm records count')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsCount.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsCount)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsCount.args.module).toBeDefined()
    expect(CrmRecordsCount.args.module.required).toBe(true)
  })

  it('has no additional flags', () => {
    // count is a simple read command with no extra flags
    const flagKeys = Object.keys(CrmRecordsCount.flags ?? {})
    expect(flagKeys).not.toContain('dry-run')
    expect(flagKeys).not.toContain('page')
  })
})

// ---------------------------------------------------------------------------
// crm records deleted
// ---------------------------------------------------------------------------
describe('crm records deleted', () => {
  it('has correct command id', () => {
    expect(CrmRecordsDeleted.id).toBe('crm records deleted')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsDeleted.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsDeleted)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsDeleted.args.module).toBeDefined()
    expect(CrmRecordsDeleted.args.module.required).toBe(true)
  })

  it('supports --type flag with options', () => {
    expect(CrmRecordsDeleted.flags.type).toBeDefined()
    const options = (CrmRecordsDeleted.flags.type as any).options
    expect(options).toContain('all')
    expect(options).toContain('recycle')
    expect(options).toContain('permanent')
  })

  it('--type defaults to all', () => {
    expect(CrmRecordsDeleted.flags.type.default).toBe('all')
  })

  it('supports --page flag with default 1', () => {
    expect(CrmRecordsDeleted.flags.page).toBeDefined()
    expect(CrmRecordsDeleted.flags.page.default).toBe(1)
  })

  it('supports --per-page flag with default 200', () => {
    expect(CrmRecordsDeleted.flags['per-page']).toBeDefined()
    expect(CrmRecordsDeleted.flags['per-page'].default).toBe(200)
  })

  it('does not have --dry-run flag (read command)', () => {
    expect(CrmRecordsDeleted.flags['dry-run']).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// crm records timeline
// ---------------------------------------------------------------------------
describe('crm records timeline', () => {
  it('has correct command id', () => {
    expect(CrmRecordsTimeline.id).toBe('crm records timeline')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsTimeline.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsTimeline)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsTimeline.args.module).toBeDefined()
    expect(CrmRecordsTimeline.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsTimeline.args.id).toBeDefined()
    expect(CrmRecordsTimeline.args.id.required).toBe(true)
  })

  it('supports --page flag with default 1', () => {
    expect(CrmRecordsTimeline.flags.page).toBeDefined()
    expect(CrmRecordsTimeline.flags.page.default).toBe(1)
  })

  it('supports --per-page flag with default 200', () => {
    expect(CrmRecordsTimeline.flags['per-page']).toBeDefined()
    expect(CrmRecordsTimeline.flags['per-page'].default).toBe(200)
  })

  it('does not have --dry-run flag (read command)', () => {
    expect(CrmRecordsTimeline.flags['dry-run']).toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// crm records blueprint
// ---------------------------------------------------------------------------
describe('crm records blueprint', () => {
  it('has correct command id', () => {
    expect(CrmRecordsBlueprint.id).toBe('crm records blueprint')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsBlueprint.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsBlueprint)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsBlueprint.args.module).toBeDefined()
    expect(CrmRecordsBlueprint.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsBlueprint.args.id).toBeDefined()
    expect(CrmRecordsBlueprint.args.id.required).toBe(true)
  })

  it('requires action arg with options get and update', () => {
    expect(CrmRecordsBlueprint.args.action).toBeDefined()
    expect(CrmRecordsBlueprint.args.action.required).toBe(true)
    const options = (CrmRecordsBlueprint.args.action as any).options
    expect(options).toContain('get')
    expect(options).toContain('update')
  })

  it('supports optional --data flag', () => {
    expect(CrmRecordsBlueprint.flags.data).toBeDefined()
    expect(CrmRecordsBlueprint.flags.data.required).toBeFalsy()
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsBlueprint.flags.data.char).toBe('d')
  })
})

// ---------------------------------------------------------------------------
// crm records change-owner
// ---------------------------------------------------------------------------
describe('crm records change-owner', () => {
  it('has correct command id', () => {
    expect(CrmRecordsChangeOwner.id).toBe('crm records change-owner')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsChangeOwner.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsChangeOwner)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsChangeOwner.args.module).toBeDefined()
    expect(CrmRecordsChangeOwner.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsChangeOwner.args.id).toBeDefined()
    expect(CrmRecordsChangeOwner.args.id.required).toBe(true)
  })

  it('requires --to flag', () => {
    expect(CrmRecordsChangeOwner.flags.to).toBeDefined()
    expect(CrmRecordsChangeOwner.flags.to.required).toBe(true)
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsChangeOwner.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsChangeOwner.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records merge
// ---------------------------------------------------------------------------
describe('crm records merge', () => {
  it('has correct command id', () => {
    expect(CrmRecordsMerge.id).toBe('crm records merge')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsMerge.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsMerge)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsMerge.args.module).toBeDefined()
    expect(CrmRecordsMerge.args.module.required).toBe(true)
  })

  it('requires masterId arg', () => {
    expect(CrmRecordsMerge.args.masterId).toBeDefined()
    expect(CrmRecordsMerge.args.masterId.required).toBe(true)
  })

  it('requires --with flag', () => {
    expect(CrmRecordsMerge.flags.with).toBeDefined()
    expect(CrmRecordsMerge.flags.with.required).toBe(true)
  })

  it('supports optional --data flag for merge instructions', () => {
    expect(CrmRecordsMerge.flags.data).toBeDefined()
    expect(CrmRecordsMerge.flags.data.required).toBeFalsy()
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsMerge.flags.data.char).toBe('d')
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsMerge.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsMerge.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records share
// ---------------------------------------------------------------------------
describe('crm records share', () => {
  it('has correct command id', () => {
    expect(CrmRecordsShare.id).toBe('crm records share')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsShare.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsShare)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsShare.args.module).toBeDefined()
    expect(CrmRecordsShare.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsShare.args.id).toBeDefined()
    expect(CrmRecordsShare.args.id.required).toBe(true)
  })

  it('requires action arg with correct options', () => {
    expect(CrmRecordsShare.args.action).toBeDefined()
    expect(CrmRecordsShare.args.action.required).toBe(true)
    const options = (CrmRecordsShare.args.action as any).options
    expect(options).toContain('list')
    expect(options).toContain('add')
    expect(options).toContain('update')
    expect(options).toContain('revoke')
  })

  it('supports optional --data flag', () => {
    expect(CrmRecordsShare.flags.data).toBeDefined()
    expect(CrmRecordsShare.flags.data.required).toBeFalsy()
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsShare.flags.data.char).toBe('d')
  })

  it('supports optional --share-id flag', () => {
    expect(CrmRecordsShare.flags['share-id']).toBeDefined()
    expect(CrmRecordsShare.flags['share-id'].required).toBeFalsy()
  })
})

// ---------------------------------------------------------------------------
// crm records lock
// ---------------------------------------------------------------------------
describe('crm records lock', () => {
  it('has correct command id', () => {
    expect(CrmRecordsLock.id).toBe('crm records lock')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsLock.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsLock)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsLock.args.module).toBeDefined()
    expect(CrmRecordsLock.args.module.required).toBe(true)
  })

  it('requires id arg', () => {
    expect(CrmRecordsLock.args.id).toBeDefined()
    expect(CrmRecordsLock.args.id.required).toBe(true)
  })

  it('requires action arg with options get, lock, unlock', () => {
    expect(CrmRecordsLock.args.action).toBeDefined()
    expect(CrmRecordsLock.args.action.required).toBe(true)
    const options = (CrmRecordsLock.args.action as any).options
    expect(options).toContain('get')
    expect(options).toContain('lock')
    expect(options).toContain('unlock')
  })

  it('supports optional --lock-id flag', () => {
    expect(CrmRecordsLock.flags['lock-id']).toBeDefined()
    expect(CrmRecordsLock.flags['lock-id'].required).toBeFalsy()
  })

  it('supports optional --data flag', () => {
    expect(CrmRecordsLock.flags.data).toBeDefined()
    expect(CrmRecordsLock.flags.data.required).toBeFalsy()
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsLock.flags.data.char).toBe('d')
  })
})

// ---------------------------------------------------------------------------
// crm records mass-update
// ---------------------------------------------------------------------------
describe('crm records mass-update', () => {
  it('has correct command id', () => {
    expect(CrmRecordsMassUpdate.id).toBe('crm records mass-update')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsMassUpdate.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsMassUpdate)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsMassUpdate.args.module).toBeDefined()
    expect(CrmRecordsMassUpdate.args.module.required).toBe(true)
  })

  it('requires --ids flag', () => {
    expect(CrmRecordsMassUpdate.flags.ids).toBeDefined()
    expect(CrmRecordsMassUpdate.flags.ids.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(CrmRecordsMassUpdate.flags.data).toBeDefined()
    expect(CrmRecordsMassUpdate.flags.data.required).toBe(true)
  })

  it('has --data flag with char shortcut d', () => {
    expect(CrmRecordsMassUpdate.flags.data.char).toBe('d')
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsMassUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsMassUpdate.flags['dry-run'].default).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// crm records mass-delete
// ---------------------------------------------------------------------------
describe('crm records mass-delete', () => {
  it('has correct command id', () => {
    expect(CrmRecordsMassDelete.id).toBe('crm records mass-delete')
  })

  it('has a non-empty summary', () => {
    expect(CrmRecordsMassDelete.summary).toBeTruthy()
  })

  it('extends CrmBaseCommand', () => {
    expect(Object.getPrototypeOf(CrmRecordsMassDelete)).toBe(CrmBaseCommand)
  })

  it('requires module arg', () => {
    expect(CrmRecordsMassDelete.args.module).toBeDefined()
    expect(CrmRecordsMassDelete.args.module.required).toBe(true)
  })

  it('requires --ids flag', () => {
    expect(CrmRecordsMassDelete.flags.ids).toBeDefined()
    expect(CrmRecordsMassDelete.flags.ids.required).toBe(true)
  })

  it('supports --dry-run flag (write command)', () => {
    expect(CrmRecordsMassDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect(CrmRecordsMassDelete.flags['dry-run'].default).toBe(false)
  })
})
