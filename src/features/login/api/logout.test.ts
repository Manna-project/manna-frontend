import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"
import { httpClient } from "@/shared/api/httpClient"
import { logoutCurrentUser } from "./logout"

const csrfEndpoint = httpClient.getUri({ url: "/api/v1/auth/csrf" })
const logoutEndpoint = httpClient.getUri({ url: "/api/v1/auth/logout" })

const csrfResponse = {
  headerName: "X-XSRF-TOKEN",
  parameterName: "_csrf",
  token: "csrf-token",
} as const

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("logoutCurrentUser", () => {
  it("CSRF 쿠키를 발급받은 뒤 로그아웃을 요청한다", async () => {
    // Given
    const requests: string[] = []
    server.use(
      http.get(csrfEndpoint, () => {
        requests.push("csrf")
        return HttpResponse.json(csrfResponse)
      }),
      http.post(logoutEndpoint, () => {
        requests.push("logout")
        return new HttpResponse(null, { status: 204 })
      }),
    )

    // When
    await logoutCurrentUser()

    // Then
    expect(requests).toEqual(["csrf", "logout"])
  })

  it("잘못된 CSRF 응답이면 로그아웃 요청을 보내지 않는다", async () => {
    // Given
    let logoutRequestCount = 0
    server.use(
      http.get(csrfEndpoint, () => HttpResponse.json({ token: "csrf-token" })),
      http.post(logoutEndpoint, () => {
        logoutRequestCount += 1
        return new HttpResponse(null, { status: 204 })
      }),
    )

    // When
    const logoutRequest = logoutCurrentUser()

    // Then
    await expect(logoutRequest).rejects.toMatchObject({ name: "ZodError" })
    expect(logoutRequestCount).toBe(0)
  })

  it("로그아웃이 거부되면 HTTP 오류를 전달한다", async () => {
    // Given
    server.use(
      http.get(csrfEndpoint, () => HttpResponse.json(csrfResponse)),
      http.post(logoutEndpoint, () => new HttpResponse(null, { status: 403 })),
    )

    // When
    const logoutRequest = logoutCurrentUser()

    // Then
    await expect(logoutRequest).rejects.toMatchObject({
      response: {
        status: 403,
      },
    })
  })
})
