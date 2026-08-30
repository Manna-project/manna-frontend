import { describe, expect, it } from "vitest"
import type { CurrentUser } from "@/entities/currentUser.schema"
import { getUserDisplayName, getUserInitial } from "./userIdentity"

const user: CurrentUser = {
  entityId: "123e4567-e89b-12d3-a456-426614174000",
  email: "sumin@example.com",
  name: "김수민",
  nickname: "수민",
  profileImage: null,
}

describe("userIdentity", () => {
  it("닉네임을 표시 이름으로 우선 사용한다", () => {
    expect(getUserDisplayName(user)).toBe("수민")
  })

  it("닉네임이 없으면 이름을 사용한다", () => {
    expect(getUserDisplayName({ ...user, nickname: null })).toBe("김수민")
  })

  it("표시 이름의 첫 글자를 아바타 문자로 사용한다", () => {
    expect(getUserInitial(user)).toBe("수")
  })
})
