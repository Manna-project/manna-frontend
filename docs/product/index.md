# Product Scope

## Current Routes

- `/`: 장소 추천 조건을 입력하는 시작 화면
- `/login`: Google·Kakao OAuth 로그인 시작 화면
- `/oauth/callback`: 백엔드 OAuth 처리 후 정상 인증은 메인으로, 오류는 로그인 화면으로 보내는 중간 경로

## Current User Flows

장소 검색 폼은 클라이언트 검증과 성공 상태 표현까지만 구현되어 있으며 실제 추천 API에는 연결되지 않았습니다. 로그인 화면은 백엔드 OAuth 시작 엔드포인트(`/api/v1/oauth2/google`, `/api/v1/oauth2/kakao`)로 브라우저를 이동시킵니다. 백엔드가 인증 토큰을 설정한 뒤 `/oauth/callback`으로 보내면 정상 인증은 메인으로 이동하고 OAuth 오류는 로그인 화면에 표시합니다. 온보딩 상태 API가 없으므로 신규 사용자 분기는 아직 수행하지 않습니다. 사용자 목록 조회 hook은 `/users` 응답을 TanStack Query로 관리합니다.

## Product Change Rule

사용자에게 보이는 동작이나 API 계약을 변경할 때 관련 route, feature, domain schema, 테스트, 이 문서를 함께 검토합니다. 구현되지 않은 요구사항을 문서에서 완료된 기능처럼 표현하지 않습니다.
