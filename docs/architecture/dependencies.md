# Dependency Rules

허용 방향은 다음과 같습니다.

```text
app -> app, features, entities, shared
features/<name> -> same feature, entities, shared
entities -> entities, shared
shared -> shared
```

금지 예시:

```text
shared -> entities
entities -> features
features/login -> features/user
features -> app
```

서로 다른 feature의 동작을 연결하려면 `src/app`에서 두 feature를 조합하거나 공유되는 도메인 계약을 `entities`로 내립니다. 범용 기술 코드라면 `shared`로 내립니다.

`pnpm architecture`는 TypeScript compiler API로 정적 import, export, dynamic import를 읽어 위 규칙을 검사합니다. 오류에는 위반 파일, import 대상, 허용 방향, 수정 방법이 출력됩니다.
