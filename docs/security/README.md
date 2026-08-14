# Frontend Security

- `NEXT_PUBLIC_` 변수는 브라우저에 공개됩니다. 비밀키와 서버 전용 토큰을 넣지 않습니다.
- `.env`와 `.env.local`은 커밋하지 않고 `.env.example`에는 이름과 형식만 기록합니다.
- API, 사용자 입력, 외부 SDK 데이터는 Zod 경계에서 파싱합니다.
- 인증 토큰 저장 방식은 백엔드 계약 전까지 확정하지 않습니다. 가능하면 Secure, HttpOnly, SameSite cookie 기반 세션을 검토합니다.
- 사용자에게 server stack, 원본 오류 payload, credential을 노출하지 않습니다.
- 외부 script 추가는 공급망 위험, CSP, production 포함 여부를 검토합니다.

보안 관련 변경은 `pnpm verify` 외에 위협 경계와 실패 시나리오를 자체 리뷰합니다.
