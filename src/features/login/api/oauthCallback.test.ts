import { describe, expect, it } from "vitest"
import { getOAuthCallbackDestination } from "./oauthCallback"

describe("getOAuthCallbackDestination", () => {
  it("returns the main route when OAuth succeeds", () => {
    expect(getOAuthCallbackDestination(undefined)).toBe("/")
  })

  it("returns the login error route when OAuth fails", () => {
    expect(getOAuthCallbackDestination("access_denied")).toBe("/login?error=oauth")
  })
})
