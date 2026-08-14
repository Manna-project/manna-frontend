@AGENTS.md

# Claude Code

프로젝트 지식의 기준은 `AGENTS.md`와 그 문서가 연결하는 `docs/`입니다. 규칙을 이 파일에 복제하지 마십시오.

- 복잡한 변경은 `/plan-change`로 영향 범위와 검증 계획을 먼저 작성합니다.
- 구현 후 `/verify`를 실행하고 실패를 수정한 뒤 다시 실행합니다.
- 개인 권한과 실험 설정은 `.claude/settings.local.json`에만 둡니다.
- `/memory`로 이 파일과 `AGENTS.md`가 로드되었는지 확인할 수 있습니다.
