# Repository Guidelines

## Project Structure & Module Organization

This is a pnpm workspace TypeScript monorepo. Shared runtime code lives in `packages/core`, the oclif entry point lives in `packages/cli`, and Zoho product integrations live in `packages/plugin-*` packages such as `plugin-crm`, `plugin-books`, `plugin-projects`, `plugin-people`, `plugin-desk`, `plugin-expense`, and `plugin-bookings`. Each package keeps source files under `src/`, tests under `tests/`, and generated build output in `dist/`. Root configuration includes `tsconfig.base.json`, `vitest.workspace.ts`, `pnpm-workspace.yaml`, and `pnpm-lock.yaml`.

## Build, Test, and Development Commands

- `pnpm install` installs workspace dependencies with pnpm 9.
- `pnpm build` runs each package build script with `tsc -p tsconfig.build.json`.
- `pnpm test` runs `vitest run` across workspace packages.
- `pnpm --filter @zoho-cli/core test` runs one package test suite; replace the filter for a plugin package.
- `pnpm clean` removes package `dist/` directories.
- `./packages/cli/bin/dev.js --help` runs the CLI from TypeScript during development.

## Coding Style & Naming Conventions

Use TypeScript ESM targeting Node 20+. Match the existing style: 2-space indentation, single quotes, no semicolons, strict types, and `.js` extensions on local imports. Command files should extend the relevant base command (`CrmBaseCommand`, `BooksBaseCommand`, `ProjectsBaseCommand`, etc.), use oclif `static id` values with spaces such as `crm records list`, and emit JSON through `outputSuccess`, `outputError`, or `handleApiError`. Keep read flags such as `--fields` and write safety flags such as `--dry-run` consistent with nearby commands.

## Testing Guidelines

Tests use Vitest, with oclif command tests where appropriate. Name test files `*.test.ts` and place them under the package `tests/` tree, mirroring the source or command area, for example `packages/plugin-desk/tests/commands/desk/tickets.test.ts`. Mock network calls and token/config stores; avoid tests that require live Zoho credentials.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit style, for example `fix(bookings): ...`, `feat(cli): ...`, and `docs: ...`. Use a scoped prefix when the change is package-specific. Pull requests should describe the behavior change, list the commands or tests run, link related issues, and include sample CLI output for user-visible command changes.

## Security & Configuration Tips

Do not commit OAuth credentials, refresh tokens, or local config. The CLI stores tokens outside the repo under `~/.zoho-cli/tokens.json`; prefer environment variables such as `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_REGION`, and `ZOHO_PORTAL_ID` for local testing.
