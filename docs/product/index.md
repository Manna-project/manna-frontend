# Product Scope

## Current Routes

- `/`: 장소 추천 조건을 입력하는 시작 화면
- `/login`: 초기 로그인 프로토타입

## Current User Flows

장소 검색 폼은 클라이언트 검증과 성공 상태 표현까지만 구현되어 있으며 실제 추천 API에는 연결되지 않았습니다. 사용자 목록 조회 hook은 `/users` 응답을 TanStack Query로 관리합니다.

## Product Change Rule

사용자에게 보이는 동작이나 API 계약을 변경할 때 관련 route, feature, domain schema, 테스트, 이 문서를 함께 검토합니다. 구현되지 않은 요구사항을 문서에서 완료된 기능처럼 표현하지 않습니다.
