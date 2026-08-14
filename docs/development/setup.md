# Local Setup

## Requirements

- Node.js 22 이상
- Corepack 또는 `package.json`에 지정된 pnpm 11

## Install

```bash
corepack enable
./scripts/setup
cp .env.example .env
```

`NEXT_PUBLIC_API_BASE_URL`은 절대 URL이어야 하며 지정하지 않으면 `http://localhost:8080`을 사용합니다. `.env`는 커밋하지 않습니다.

## Start

```bash
./scripts/dev
```

기본 주소는 `http://localhost:3000`입니다. `NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS=1`로 react-grab과 react-scan을 임시 비활성화할 수 있습니다.
