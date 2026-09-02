import { describe, expect, it } from "vitest"
import { httpClient } from "./httpClient"

describe("httpClient", () => {
  it("includes authentication cookies in API requests", () => {
    expect(httpClient.defaults.withCredentials).toBe(true)
  })

  it("uses the Spring SPA CSRF cookie for cross-origin mutation requests", () => {
    expect(httpClient.defaults.withXSRFToken).toBe(true)
    expect(httpClient.defaults.xsrfCookieName).toBe("XSRF-TOKEN")
    expect(httpClient.defaults.xsrfHeaderName).toBe("X-XSRF-TOKEN")
  })
})
