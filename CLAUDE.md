# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev       # Serve with development config (http://localhost:4200)
npm run start:prod      # Serve with production config

# Build
npm run build           # Production build to dist/

# Test
npm test                # Run tests with Karma/Jasmine (watch mode)
npm run test:coverage   # Run tests with code coverage report

# Lint
npm run lint            # ESLint via angular-eslint

# Container (Podman)
npm run build:testing   # Build container image tagged :testing
npm run build:staging   # Build container image tagged :staging
npm run build:production # Build container image tagged :production and :latest
```

## Architecture

This is an Angular 20 portfolio SPA with three routes:
- `/` → `LoginComponent` (mock auth — any non-empty credentials pass)
- `/home` → `HomeComponent`
- `/contact` → `ContactComponent`

**Data flow**: Portfolio content (education, experience, projects, skills, personal-info) lives in `public/data/*.json` and is served as static assets — no API calls for content.

**Backend API**: Only used for non-content features. URL is environment-configured (`environment.apiUrl`); dev default is `http://localhost:4444`.

**Internationalisation**: `@ngx-translate` with German (`de`) as default. Translation files are loaded from `./assets/i18n/{lang}.json`. `LanguageService` wraps `TranslateService` and persists the selected language to `localStorage`. Supported languages: `de`, `en`.

**Environments**: `src/environments/environment.ts` (dev) is replaced at build time by `environment.testing.ts`, `environment.staging.ts`, or `environment.production.ts` depending on the Angular build configuration.

**Type definitions**: Interfaces in `src/app/interfaces/`, custom types in `src/app/types/`.

**CI**: Jenkinsfile pipeline runs `npm ci` → build → lint → `test:coverage` → pack → container image push. Container images are only built on `master`, `production`, `staging`, or `release/*` branches.
