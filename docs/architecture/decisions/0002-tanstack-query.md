# ADR-0002: TanStack Query for Server State

## Context

사용자 조회와 향후 장소 후보 조회·선택은 캐시, loading/error 상태, mutation 후 무효화가 필요합니다.

## Decision

서버 상태는 TanStack Query가 소유합니다. `QueryClientProvider`는 `src/app/providers.tsx`의 단일 client boundary에서 제공합니다.

## Alternatives

- SWR
- 컴포넌트별 `useEffect`와 로컬 상태

## Consequences

query key와 mutation 무효화 정책을 명시적으로 관리할 수 있습니다. API 응답은 query cache에 들어가기 전에 Zod로 파싱해야 하며 UI 전용 상태는 TanStack Query에 넣지 않습니다.
