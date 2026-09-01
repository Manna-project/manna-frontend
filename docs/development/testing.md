# Testing Strategy

## Unit

Vitest로 schema, 순수 함수, query key와 같은 빠른 계약을 검사합니다. 외부 입력 schema에는 정상값, 기본값, 잘못된 값을 포함합니다.

```bash
pnpm test
pnpm vitest run src/shared/config/env.test.ts
```

## Architecture

`scripts/check-architecture.test.mjs`는 허용·금지 import를 fixture로 검증합니다. 구조 규칙을 바꿀 때 문서, 검사기, 테스트를 함께 변경합니다.

## Documentation

`scripts/check-docs.test.mjs`는 필수 문서와 깨진 로컬 링크 탐지를 검증합니다.

## Integration

MSW로 HTTP 경계를 가로채 실제 API 함수, TanStack Query와 컴포넌트가 함께 동작하는지 검사합니다. 컴포넌트 테스트는 파일 단위로 jsdom 환경을 지정하고 테스트마다 새로운 QueryClient를 사용합니다.

인증 테스트는 `/api/v1/users/me`의 정상·비정상 응답 파싱, OAuth 콜백의 리다이렉트, 헤더의 로그인 상태 표시를 검증합니다. 외부 OAuth 제공자는 테스트 더블로 대체하지 않고 백엔드 경계 앞에서 테스트를 종료합니다.

## E2E

실제 백엔드 계약과 핵심 사용자 흐름이 안정되면 Playwright E2E를 추가합니다. 현재는 가짜 E2E를 만들지 않고 미구현 범위를 기술 부채에 기록합니다.

## Bug Fix Loop

1. 실패를 재현하는 가장 작은 테스트를 작성합니다.
2. 수정 전 테스트 실패를 확인합니다.
3. 최소 변경으로 원인을 수정합니다.
4. 대상 테스트와 `pnpm verify`를 실행합니다.
