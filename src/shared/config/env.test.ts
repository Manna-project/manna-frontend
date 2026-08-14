import { describe, expect, it } from "vitest"
import { parseClientEnv } from "./env"

describe("parseClientEnv", () => {
  it("uses the local API URL when the public variable is absent", () => {
    expect(parseClientEnv({}).NEXT_PUBLIC_API_BASE_URL).toBe("http://localhost:8080")
  })

  it("accepts an absolute API URL", () => {
    expect(
      parseClientEnv({ NEXT_PUBLIC_API_BASE_URL: "https://api.mannamap.example" })
        .NEXT_PUBLIC_API_BASE_URL,
    ).toBe("https://api.mannamap.example")
  })

  it("rejects a malformed API URL", () => {
    expect(() => parseClientEnv({ NEXT_PUBLIC_API_BASE_URL: "not-a-url" })).toThrow()
  })
})
