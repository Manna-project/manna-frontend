# Development Commands

| Command | Purpose |
|---|---|
| `./scripts/setup` | lockfile 그대로 의존성 설치 |
| `./scripts/dev` | Next.js 개발 서버 실행 |
| `./scripts/test` | Vitest 단발 실행 |
| `pnpm test:watch` | Vitest watch mode |
| `./scripts/lint` | Biome와 Next ESLint 실행 |
| `./scripts/typecheck` | strict TypeScript 검사 |
| `pnpm architecture` | 레이어 의존성 검사 |
| `pnpm docs:check` | 필수 문서·heading·로컬 링크 검사 |
| `pnpm drift:check` | 파일 크기와 기술 부채 표식 검사 |
| `./scripts/verify` | 모든 검사와 프로덕션 빌드 실행 |

에이전트는 명령을 추측하거나 일부 검사만으로 완료를 주장하지 않습니다. 최종 계약은 `./scripts/verify`입니다.
