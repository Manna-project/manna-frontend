# ADR-0001: Feature-Oriented Frontend Boundaries

## Context

프로젝트는 App Router 라우트와 로그인, 사용자 조회, 장소 검색 기능을 포함합니다. 초보 기여자와 에이전트가 파일 위치와 허용 의존성을 빠르게 판단할 수 있어야 합니다.

## Decision

`app`, `features`, `entities`, `shared` 네 경계를 사용하고 의존성을 `app -> features -> entities -> shared` 방향으로 제한합니다. feature 간 직접 import는 금지하고 조합은 app에서 수행합니다.

## Alternatives

- 파일 종류별 `components`, `hooks`, `utils` 전역 폴더
- 완전한 Feature-Sliced Design 계층 전체 도입

## Consequences

기능의 관련 코드가 함께 위치하고 구조 검사가 잘못된 import를 차단합니다. 공유 여부가 불분명한 코드는 실제 두 번째 소비자가 생기기 전까지 feature 내부에 둡니다.
