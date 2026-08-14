# Mannamap Frontend

여러 참여자의 조건을 바탕으로 약속 장소 후보를 탐색하는 Mannamap의 Next.js 프론트엔드입니다.

## Quick Start

요구 사항은 Node.js 22 이상과 `package.json`의 `packageManager` 필드에 지정된 pnpm 버전입니다.

```bash
./scripts/setup
cp .env.example .env
./scripts/dev
```

개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## Verification

```bash
./scripts/verify
```

이 명령은 포맷, lint, typecheck, unit test, 아키텍처, 문서, drift, 프로덕션 빌드를 순서대로 검사합니다.

## Repository Guide

- 에이전트와 기여자는 먼저 [AGENTS.md](AGENTS.md)를 읽습니다.
- 시스템 경계는 [ARCHITECTURE.md](ARCHITECTURE.md)를 확인합니다.
- 상세 문서 색인은 [docs/README.md](docs/README.md)에 있습니다.
- 시각 규칙은 [DESIGN.md](DESIGN.md)에 있습니다.
