# Architecture Boundaries

## App

`src/app`은 라우팅과 조립을 소유합니다. feature 간 조합, 전역 provider, metadata는 여기에 둡니다. 재사용 가능한 비즈니스 동작을 직접 구현하지 않습니다.

## Features

`src/features/<name>`은 하나의 사용자 행동을 소유합니다. 자체 컴포넌트, hook, API 함수, form schema를 가질 수 있습니다. 다른 feature를 직접 import하지 않고 `app`에서 조합합니다.

## Entities

`src/entities`는 여러 feature가 공유하는 도메인 언어를 소유합니다. API 응답처럼 신뢰할 수 없는 데이터에는 Zod schema를 제공하고 타입은 schema에서 추론합니다.

## Shared

`src/shared`는 특정 feature나 entity를 모르는 공용 인프라입니다. HTTP client, 공개 환경 변수 파서, 범용 UI가 여기에 해당합니다.

## Boundary Validation

```text
environment, user input, API JSON
-> Zod parse
-> typed internal value
-> feature logic and UI
```

`unknown`은 파싱 경계를 지나 내부 로직으로 전달하지 않습니다. 민감한 환경 변수는 브라우저에서 읽지 않습니다.
