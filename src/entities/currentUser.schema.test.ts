import { describe, expect, it } from "vitest"
import { currentUserSchema } from "./currentUser.schema"

describe("currentUserSchema", () => {
  it("parses the current user response", () => {
    const response = {
      entityId: "809f5da1-3626-42a0-a135-3a5f6f71c219",
      email: "user@example.com",
      name: "만나 사용자",
      nickname: null,
      profileImage: null,
    }

    expect(currentUserSchema.parse(response)).toEqual(response)
  })

  it("rejects a malformed entity id", () => {
    expect(() =>
      currentUserSchema.parse({
        entityId: "not-a-uuid",
        email: "user@example.com",
        name: "만나 사용자",
        nickname: "만나",
        profileImage: "https://example.com/profile.png",
      }),
    ).toThrow()
  })
})
