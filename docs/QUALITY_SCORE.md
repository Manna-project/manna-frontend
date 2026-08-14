# Harness Quality Score

평가는 `A = 에이전트가 독립적으로 활용 가능`, `B = 대부분 가능하지만 보완 필요`, `C = 사람이 설명해야 작업 가능`, `D = 거의 존재하지 않음`을 사용합니다.

| Area | Before | Current | Evidence and Remaining Work |
|---|---:|---:|---|
| Repository Discoverability | C | A | `AGENTS.md`, `README.md`, 문서 색인 |
| Architecture Discoverability | D | A | architecture map, boundaries, dependency check |
| Domain Knowledge | D | B | 확인된 모델과 unknown 기록, 백엔드 계약 미확정 |
| Development Workflow | B | A | 표준 shell과 pnpm 명령 |
| Testability | D | B | Vitest와 guardrail tests, E2E 미도입 |
| Verification Loop | C | A | `pnpm verify` 단일 진입점 |
| Static Guardrails | B | A | Biome, ESLint, strict TypeScript, Zod |
| Architecture Guardrails | D | A | TypeScript AST dependency 검사 |
| Documentation Quality | D | A | 역할별 문서와 링크 검사 |
| Documentation Freshness | D | B | 필수 구조·링크 검사, 의미 기반 freshness는 review 필요 |
| Observability | D | C | 로컬 신호 문서화, production telemetry 없음 |
| Failure Reproduction | D | B | debugging 절차와 target test 명령, 실제 backend seed 없음 |
| Agent Self-Review | D | A | 자체 리뷰 체크리스트와 verify skill |
| Technical Debt Tracking | D | A | ID 기반 debt register와 drift 검사 |
| Decision History | C | A | 경계와 TanStack Query ADR |
| CI Feedback Quality | D | A | 로컬과 같은 verify workflow |

## Biggest Remaining Gaps

1. 인증과 장소 추천 백엔드 계약이 아직 확정되지 않았습니다.
2. 안정된 핵심 사용자 흐름이 없어 실제 E2E와 contract test를 만들 수 없습니다.
3. 배포 환경과 production observability 공급자가 정해지지 않았습니다.

이 점수는 구현되지 않은 제품 기능을 하네스 성숙도로 과장하지 않으며, 상태가 바뀌면 근거와 함께 갱신합니다.

## Verification Evidence

- `pnpm verify`: format, lint, typecheck, 7 tests, architecture, documentation, drift, production build 통과
- Production routes: `/`, `/login` 정적 생성 통과
- Claude Code project settings: JSON 구문과 필수 permission 구조를 `pnpm docs:check`에서 검증
- Claude Code CLI: 현재 머신에 실행 파일이 없어 `/memory`, `/status`, `/verify`의 대화형 실행은 확인하지 못함
