# Observability

## Current Signals

- Next.js 개발 서버와 프로덕션 빌드 출력
- 브라우저 Network와 console
- TanStack Query 상태
- Zod parse failure
- React Doctor, react-scan, react-grab 개발 도구

## Missing Signals

배포 환경의 오류 추적, Web Vitals, API correlation ID, 사용자 영향도 집계는 아직 없습니다. 공급자를 선택하기 전에는 임시 telemetry를 추가하지 않습니다.

장애 재현에 필요한 최소 정보는 route, app version 또는 commit, 입력의 비민감 요약, HTTP status, schema issue path, 발생 시각입니다.
