# Error Handling

- Zod 오류는 외부 계약 불일치로 취급하고 field path를 보존합니다.
- Axios 오류는 HTTP 상태, 요청 종류, 재시도 가능 여부를 구분해 UI 경계로 전달합니다.
- 예상 가능한 사용자 오류와 프로그래밍 오류를 같은 fallback으로 숨기지 않습니다.
- catch한 알 수 없는 오류는 타입을 좁혀 처리하거나 다시 throw합니다.
- 사용자 메시지에는 비밀값, stack trace, 원본 서버 payload를 노출하지 않습니다.

TanStack Query의 retry는 기본 1회이며 mutation은 멱등성과 사용자 의도를 확인한 뒤 별도로 정합니다.
