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

## Integration and E2E

실제 백엔드 계약과 핵심 사용자 흐름이 안정되면 API contract test와 Playwright E2E를 추가합니다. 현재는 가짜 E2E를 만들지 않고 미구현 범위를 기술 부채에 기록합니다.

## Bug Fix Loop

1. 실패를 재현하는 가장 작은 테스트를 작성합니다.
2. 수정 전 테스트 실패를 확인합니다.
3. 최소 변경으로 원인을 수정합니다.
4. 대상 테스트와 `pnpm verify`를 실행합니다.
