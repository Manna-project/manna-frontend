import { describe, expect, it } from "vitest"
import { getOAuthUrl } from "./oauth"

describe("getOAuthUrl", () => {
  it("returns the Google OAuth start URL", () => {
    expect(getOAuthUrl("https://api.mannamap.example", "google")).toBe(
      "https://api.mannamap.example/api/v1/oauth2/google",
    )
  })

  it("returns the Kakao OAuth start URL without duplicating slashes", () => {
    expect(getOAuthUrl("https://api.mannamap.example/", "kakao")).toBe(
      "https://api.mannamap.example/api/v1/oauth2/kakao",
    )
  })
})
