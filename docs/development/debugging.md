# Debugging

## Start the Application

```bash
./scripts/setup
./scripts/dev
```

## Reproduce a UI Failure

1. 실패 route와 입력값을 기록합니다.
2. 브라우저 console과 Network panel에서 최초 실패 요청을 확인합니다.
3. API 응답이 schema에서 거부되면 Zod issue path와 실제 payload를 비교합니다. 민감한 payload는 문서나 로그에 남기지 않습니다.
4. 가능하면 Vitest 재현 테스트를 먼저 추가합니다.

## Targeted Checks

```bash
pnpm vitest run path/to/file.test.ts
pnpm typecheck
pnpm architecture
```

## Reset Local State

개발 서버를 종료하고 `.next` 캐시만 제거한 뒤 다시 실행합니다. 의존성 문제일 때는 `pnpm install --frozen-lockfile`로 lockfile 상태를 복원합니다. 사용자 데이터나 Git 변경사항을 자동으로 삭제하지 않습니다.

## Inspect Failures

- format/lint: 출력된 파일과 rule ID를 따릅니다.
- architecture: 출력된 허용 방향에 맞춰 계약을 하위 레이어로 옮기거나 app에서 조합합니다.
- docs: 누락 파일, heading, 깨진 상대 링크를 수정합니다.
- build: 최초 오류부터 해결하고 이후 연쇄 오류를 다시 확인합니다.
