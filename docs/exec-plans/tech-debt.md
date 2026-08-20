# Technical Debt

## [auth-contract] Onboarding-aware login contract is incomplete

- Problem: OAuth 시작과 `/oauth/callback` 처리는 구현되어 있지만 현재 사용자와 온보딩 완료 상태를 조회하는 API 계약이 없습니다.
- Impact: 인증 성공 후 신규 사용자와 기존 사용자를 구분하지 못하고 모두 메인 화면으로 이동합니다.
- Location: `src/features/login`, `src/app/login`, `src/app/oauth/callback`
- Suggested Fix: 온보딩 상태 API 계약이 확정되면 Zod 응답 schema와 TanStack Query hook을 추가하고 콜백에서 `/` 또는 `/onboarding`으로 분기합니다.
- Priority: High

## [meeting-api] Meeting recommendation API is not connected

- Problem: 장소 검색은 client validation과 지연 성공 상태만 구현되어 있습니다.
- Impact: 실제 장소 후보를 반환하지 않습니다.
- Location: `src/features/meeting-search`
- Suggested Fix: 추천 API 계약 확정 후 entity schema, query 또는 mutation, loading/error/empty states를 구현합니다.
- Priority: High

## [e2e-coverage] Stable end-to-end flow is unavailable

- Problem: 백엔드와 인증 계약이 확정되지 않아 실제 핵심 흐름의 E2E가 없습니다.
- Impact: 브라우저와 백엔드를 합친 회귀를 자동 탐지하지 못합니다.
- Location: repository-wide
- Suggested Fix: 첫 안정 API flow와 test data 전략이 생기면 Playwright E2E와 CI job을 추가합니다.
- Priority: Medium

## [production-observability] Production telemetry is not configured

- Problem: 배포 환경의 error tracking과 Web Vitals 수집이 없습니다.
- Impact: 사용자 환경의 실패를 저장소만으로 추적할 수 없습니다.
- Location: application boundary
- Suggested Fix: 배포 대상과 개인정보 정책 확정 후 공급자 ADR, scrub 규칙, source map 정책을 추가합니다.
- Priority: Medium
