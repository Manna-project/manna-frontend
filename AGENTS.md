# Mission

Mannamap frontend는 여러 참여자의 출발 조건을 바탕으로 약속 장소 후보를 탐색하는 웹 애플리케이션입니다. Next.js App Router와 React를 사용하며, 서버 상태는 TanStack Query, 외부 데이터 경계는 Zod가 담당합니다. 이 저장소의 하네스는 에이전트가 문서를 따라 탐색하고 `pnpm verify`로 스스로 변경을 검증하도록 설계되어 있습니다.

# Repository Map

```text
src/app        -> 라우트, 레이아웃, 전역 provider 조립
src/features   -> 사용자 행동 단위 기능
src/entities   -> 여러 기능이 공유하는 도메인 모델과 스키마
src/shared     -> 도메인 비의존 공용 API, 설정, UI
scripts        -> 개발 명령과 기계적 guardrail
docs           -> 아키텍처, 도메인, 개발, 신뢰성 지식의 기준
.claude        -> Claude Code 전용 얇은 호환 계층
```

# Where to Look

라우트나 화면을 변경할 때:

1. `DESIGN.md`
2. `docs/product/index.md`
3. 관련 `src/app` 및 `src/features` 코드

API나 서버 상태를 변경할 때:

1. `docs/architecture/boundaries.md`
2. `docs/reliability/errors.md`
3. 관련 `src/entities` 스키마와 `src/shared/api` 코드

구조를 변경할 때:

1. `ARCHITECTURE.md`
2. `docs/architecture/dependencies.md`
3. `docs/architecture/decisions/`

버그를 수정할 때:

1. `docs/development/debugging.md`
2. `docs/development/testing.md`
3. `docs/exec-plans/tech-debt.md`

# Commit Message Rules

```bash
feat: {작업 내용} -> 기능 추가의 경우
fix: {작업 내용} -> 버그 수정
refactor: {작업 내용} -> 코드 리팩터링
chore: {작업 내용} -> 의존성, 코드 운영 관점의 변경
docs: {작업 내용} -> README 등 문서 작업
```

# Before starting all the work

항상 모든 작업을 시작하기 전에, 브랜치를 만들어서 작업을 시작합니다.
Commit Message Rules 내용을 참고해서, 각 작업 성격에 맞는 브랜치를 만들어서 진행합니다.

예시

- feat/{domain}
- fix/{domain}
- refactor/{domain}

# Development Commands

```bash
./scripts/setup
./scripts/dev
./scripts/test
./scripts/lint
./scripts/typecheck
./scripts/verify
```

# Non-Negotiable Invariants

1. 의존성은 `app -> features -> entities -> shared` 방향으로만 흐릅니다.
2. feature는 다른 feature를 직접 import하지 않습니다. 조합은 `app`에서 수행합니다.
3. API 응답, 환경 변수, 사용자 입력은 경계에서 Zod로 파싱합니다.
4. 서버 상태는 TanStack Query가 소유하며 컴포넌트 로컬 상태와 구분합니다.
5. 비밀값을 `NEXT_PUBLIC_` 변수나 클라이언트 번들에 넣지 않습니다.
6. 기존 abstraction과 패턴을 먼저 사용하고 중복 helper를 만들지 않습니다.
7. 동작 변경에는 실패를 재현하거나 계약을 증명하는 테스트를 추가합니다.
8. 복잡하거나 위험한 변경은 `docs/exec-plans/active/`에 계획을 먼저 작성합니다.
9. TODO와 FIXME는 `DEBT:<id>`를 포함하고 기술 부채 문서의 동일 ID와 연결합니다.
10. 완료를 주장하기 전에 diff를 자체 리뷰하고 `pnpm verify`를 실행합니다.

# Definition of Done

- 관련 테스트가 통과합니다.
- format, lint, typecheck가 통과합니다.
- architecture, documentation, drift 검사가 통과합니다.
- 프로덕션 빌드가 통과합니다.
- 동작이나 경계가 달라졌다면 관련 문서와 ADR을 갱신했습니다.
- `pnpm verify`의 실제 성공 결과를 확인했습니다.
