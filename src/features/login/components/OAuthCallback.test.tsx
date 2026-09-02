// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, render, waitFor } from "@testing-library/react"
import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { clientEnv } from "@/shared/config/env"
import { OAuthCallback } from "./OAuthCallback"

const { replace } = vi.hoisted(() => ({
  replace: vi.fn<(destination: string) => void>(),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}))

const currentUserEndpoint = `${clientEnv.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`

const currentUserResponse = {
  entityId: "809f5da1-3626-42a0-a135-3a5f6f71c219",
  email: "user@example.com",
  name: "만나 사용자",
  nickname: "만나",
  profileImage: null,
} as const

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => {
  cleanup()
  replace.mockReset()
  server.resetHandlers()
})
afterAll(() => server.close())

function renderOAuthCallback(hasOAuthError = false) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <OAuthCallback hasOAuthError={hasOAuthError} />
    </QueryClientProvider>,
  )
}

describe("OAuthCallback", () => {
  it("현재 사용자 확인에 성공하면 메인 화면으로 이동한다", async () => {
    // Given
    server.use(http.get(currentUserEndpoint, () => HttpResponse.json(currentUserResponse)))

    // When
    renderOAuthCallback()

    // Then
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/"))
  })

  it("세션 확인이 실패하면 세션 오류가 표시되는 로그인 화면으로 이동한다", async () => {
    // Given
    let requestCount = 0
    server.use(
      http.get(currentUserEndpoint, () => {
        requestCount += 1
        return new HttpResponse(null, { status: 401 })
      }),
    )

    // When
    renderOAuthCallback()

    // Then
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login?error=session"))
    expect(requestCount).toBe(1)
  })

  it("OAuth 오류가 있으면 세션을 조회하지 않고 OAuth 오류 화면으로 이동한다", async () => {
    // Given
    let requestCount = 0
    server.use(
      http.get(currentUserEndpoint, () => {
        requestCount += 1
        return HttpResponse.json(currentUserResponse)
      }),
    )

    // When
    renderOAuthCallback(true)

    // Then
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login?error=oauth"))
    expect(requestCount).toBe(0)
  })
})
