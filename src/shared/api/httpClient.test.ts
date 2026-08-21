import { describe, expect, it } from "vitest"
import { httpClient } from "./httpClient"

describe("httpClient", () => {
  it("includes authentication cookies in API requests", () => {
    expect(httpClient.defaults.withCredentials).toBe(true)
  })
})
