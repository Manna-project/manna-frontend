# Domain Model

## Confirmed Concepts

- `User`: 숫자 ID와 비어 있지 않은 이름을 가진 사용자
- `Meeting search`: 출발지, 희망 지역, 이동 방식을 입력해 후보 탐색을 시작하는 행동
- `Travel mode`: `transit`, `walk`, `car`

## Current Contracts

- 사용자 목록 응답은 현재 `{ users: User[] }`로 파싱합니다.
- 공개 API 기준 URL은 `NEXT_PUBLIC_API_BASE_URL`이며 절대 URL이어야 합니다.

## Unknowns

모임, 참여자, 장소 후보, 추천 점수, 인증 세션의 백엔드 계약은 아직 저장소에서 확인되지 않았습니다. 계약이 확정되면 schema, 테스트, 이 문서를 같은 변경에서 갱신합니다.
