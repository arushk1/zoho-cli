import { describe, it, expect } from 'vitest'
import DeskTicketsList from '../../../src/commands/desk/tickets/list.js'
import DeskTicketsGet from '../../../src/commands/desk/tickets/get.js'
import DeskTicketsCreate from '../../../src/commands/desk/tickets/create.js'
import DeskTicketsUpdate from '../../../src/commands/desk/tickets/update.js'
import DeskTicketsDelete from '../../../src/commands/desk/tickets/delete.js'
import DeskTicketsMove from '../../../src/commands/desk/tickets/move.js'
import DeskTicketsMerge from '../../../src/commands/desk/tickets/merge.js'
import DeskTicketsSplit from '../../../src/commands/desk/tickets/split.js'
import DeskTicketsClose from '../../../src/commands/desk/tickets/close.js'
import DeskTicketsSpam from '../../../src/commands/desk/tickets/spam.js'
import DeskTicketsUnspam from '../../../src/commands/desk/tickets/unspam.js'
import DeskTicketsCount from '../../../src/commands/desk/tickets/count.js'
import DeskTicketsSearch from '../../../src/commands/desk/tickets/search.js'
import DeskTicketsHistory from '../../../src/commands/desk/tickets/history.js'
import DeskTicketsMetrics from '../../../src/commands/desk/tickets/metrics.js'
import DeskTicketsBlueprint from '../../../src/commands/desk/tickets/blueprint.js'
import DeskTicketsResolutionGet from '../../../src/commands/desk/tickets/resolution/get.js'
import DeskTicketsResolutionAdd from '../../../src/commands/desk/tickets/resolution/add.js'
import DeskTicketsResolutionUpdate from '../../../src/commands/desk/tickets/resolution/update.js'
import DeskTicketsResolutionDelete from '../../../src/commands/desk/tickets/resolution/delete.js'

describe('desk tickets list', () => {
  it('has correct command id', () => { expect(DeskTicketsList.id).toBe('desk tickets list') })
  it('has summary', () => { expect(DeskTicketsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskTicketsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketsList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTicketsList.flags.department).toBeDefined() })
  it('supports --status filter', () => { expect(DeskTicketsList.flags.status).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskTicketsList.flags['sort-by']).toBeDefined() })
})

describe('desk tickets get', () => {
  it('has correct command id', () => { expect(DeskTicketsGet.id).toBe('desk tickets get') })
  it('has summary', () => { expect(DeskTicketsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsGet.args.id.required).toBe(true) })
  it('supports --include flag', () => { expect(DeskTicketsGet.flags.include).toBeDefined() })
})

describe('desk tickets create', () => {
  it('has correct command id', () => { expect(DeskTicketsCreate.id).toBe('desk tickets create') })
  it('has summary', () => { expect(DeskTicketsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskTicketsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTicketsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk tickets update', () => {
  it('has correct command id', () => { expect(DeskTicketsUpdate.id).toBe('desk tickets update') })
  it('has summary', () => { expect(DeskTicketsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTicketsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk tickets delete', () => {
  it('has correct command id', () => { expect(DeskTicketsDelete.id).toBe('desk tickets delete') })
  it('has summary', () => { expect(DeskTicketsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsDelete.args.id.required).toBe(true) })
})

describe('desk tickets move', () => {
  it('has correct command id', () => { expect(DeskTicketsMove.id).toBe('desk tickets move') })
  it('has summary', () => { expect(DeskTicketsMove.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsMove.args.id.required).toBe(true) })
  it('requires --department flag', () => { expect(DeskTicketsMove.flags.department.required).toBe(true) })
})

describe('desk tickets merge', () => {
  it('has correct command id', () => { expect(DeskTicketsMerge.id).toBe('desk tickets merge') })
  it('has summary', () => { expect(DeskTicketsMerge.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsMerge.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsMerge.flags.data.required).toBe(true) })
})

describe('desk tickets split', () => {
  it('has correct command id', () => { expect(DeskTicketsSplit.id).toBe('desk tickets split') })
  it('has summary', () => { expect(DeskTicketsSplit.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsSplit.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsSplit.flags.data.required).toBe(true) })
})

describe('desk tickets close', () => {
  it('has correct command id', () => { expect(DeskTicketsClose.id).toBe('desk tickets close') })
  it('has summary', () => { expect(DeskTicketsClose.summary).toBeDefined() })
  it('requires --ids flag', () => { expect(DeskTicketsClose.flags.ids.required).toBe(true) })
})

describe('desk tickets spam', () => {
  it('has correct command id', () => { expect(DeskTicketsSpam.id).toBe('desk tickets spam') })
  it('has summary', () => { expect(DeskTicketsSpam.summary).toBeDefined() })
  it('requires --ids flag', () => { expect(DeskTicketsSpam.flags.ids.required).toBe(true) })
})

describe('desk tickets unspam', () => {
  it('has correct command id', () => { expect(DeskTicketsUnspam.id).toBe('desk tickets unspam') })
  it('has summary', () => { expect(DeskTicketsUnspam.summary).toBeDefined() })
  it('requires --ids flag', () => { expect(DeskTicketsUnspam.flags.ids.required).toBe(true) })
})

describe('desk tickets count', () => {
  it('has correct command id', () => { expect(DeskTicketsCount.id).toBe('desk tickets count') })
  it('has summary', () => { expect(DeskTicketsCount.summary).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTicketsCount.flags.department).toBeDefined() })
  it('supports --status filter', () => { expect(DeskTicketsCount.flags.status).toBeDefined() })
})

describe('desk tickets search', () => {
  it('has correct command id', () => { expect(DeskTicketsSearch.id).toBe('desk tickets search') })
  it('has summary', () => { expect(DeskTicketsSearch.summary).toBeDefined() })
  it('requires --query flag', () => { expect(DeskTicketsSearch.flags.query.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskTicketsSearch.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketsSearch.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTicketsSearch.flags.department).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskTicketsSearch.flags['sort-by']).toBeDefined() })
})

describe('desk tickets history', () => {
  it('has correct command id', () => { expect(DeskTicketsHistory.id).toBe('desk tickets history') })
  it('has summary', () => { expect(DeskTicketsHistory.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsHistory.args.id.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskTicketsHistory.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketsHistory.flags['per-page']).toBeDefined() })
})

describe('desk tickets metrics', () => {
  it('has correct command id', () => { expect(DeskTicketsMetrics.id).toBe('desk tickets metrics') })
  it('has summary', () => { expect(DeskTicketsMetrics.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsMetrics.args.id.required).toBe(true) })
})

describe('desk tickets blueprint', () => {
  it('has correct command id', () => { expect(DeskTicketsBlueprint.id).toBe('desk tickets blueprint') })
  it('has summary', () => { expect(DeskTicketsBlueprint.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsBlueprint.args.id.required).toBe(true) })
})

describe('desk tickets resolution get', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionGet.id).toBe('desk tickets resolution get') })
  it('has summary', () => { expect(DeskTicketsResolutionGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsResolutionGet.args.id.required).toBe(true) })
})

describe('desk tickets resolution add', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionAdd.id).toBe('desk tickets resolution add') })
  it('has summary', () => { expect(DeskTicketsResolutionAdd.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsResolutionAdd.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsResolutionAdd.flags.data.required).toBe(true) })
})

describe('desk tickets resolution update', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionUpdate.id).toBe('desk tickets resolution update') })
  it('has summary', () => { expect(DeskTicketsResolutionUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsResolutionUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsResolutionUpdate.flags.data.required).toBe(true) })
})

describe('desk tickets resolution delete', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionDelete.id).toBe('desk tickets resolution delete') })
  it('has summary', () => { expect(DeskTicketsResolutionDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsResolutionDelete.args.id.required).toBe(true) })
})
