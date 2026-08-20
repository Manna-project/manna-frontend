import { describe, expect, it } from "vitest"
import { getOAuthCallbackDestination } from "./oauthCallback"

describe("getOAuthCallbackDestination", () => {
  it("returns no route while the current user is loading", () => {
    expect(getOAuthCallbackDestination("pending")).toBeNull()
  })

  it("returns the main route when the current user loads", () => {
    expect(getOAuthCallbackDestination("authenticated")).toBe("/")
  })

  it("returns the OAuth error route when the provider rejects login", () => {
    expect(getOAuthCallbackDestination("oauth-error")).toBe("/login?error=oauth")
  })

  it("returns the session error route when the current user request fails", () => {
    expect(getOAuthCallbackDestination("session-error")).toBe("/login?error=session")
  })
})
