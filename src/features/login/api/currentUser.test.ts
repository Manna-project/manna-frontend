import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"
import { getCurrentUser } from "./currentUser"

const currentUserEndpoint = "http://localhost:8080/api/v1/users/me"

const currentUserResponse = {
  entityId: "809f5da1-3626-42a0-a135-3a5f6f71c219",
  email: "user@example.com",
  name: "만나 사용자",
  nickname: "만나",
  profileImage: "https://example.com/profile.png",
} as const

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("getCurrentUser", () => {
  it("인증된 사용자 응답을 현재 사용자로 반환한다", async () => {
    // Given
    server.use(http.get(currentUserEndpoint, () => HttpResponse.json(currentUserResponse)))

    // When
    const currentUser = await getCurrentUser()

    // Then
    expect(currentUser).toEqual(currentUserResponse)
  })

  it("잘못된 사용자 응답을 경계에서 거부한다", async () => {
    // Given
    server.use(
      http.get(currentUserEndpoint, () =>
        HttpResponse.json({
          ...currentUserResponse,
          entityId: "not-a-uuid",
        }),
      ),
    )

    // When
    const currentUserRequest = getCurrentUser()

    // Then
    await expect(currentUserRequest).rejects.toMatchObject({ name: "ZodError" })
  })

  it("세션이 없으면 401 응답을 실패로 전달한다", async () => {
    // Given
    server.use(http.get(currentUserEndpoint, () => new HttpResponse(null, { status: 401 })))

    // When
    const currentUserRequest = getCurrentUser()

    // Then
    await expect(currentUserRequest).rejects.toMatchObject({
      response: {
        status: 401,
      },
    })
  })
})
