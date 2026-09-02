// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"
import { clientEnv } from "@/shared/config/env"
import { AppHeader } from "./AppHeader"

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
  server.resetHandlers()
})
afterAll(() => server.close())

function renderAppHeader() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <AppHeader />
    </QueryClientProvider>,
  )
}

describe("AppHeader", () => {
  it("세션이 없으면 로그인 화면으로 이동할 수 있는 링크를 표시한다", async () => {
    // Given
    server.use(http.get(currentUserEndpoint, () => new HttpResponse(null, { status: 401 })))

    // When
    renderAppHeader()

    // Then
    const loginLink = await screen.findByRole("link", { name: "로그인" })
    expect(loginLink.getAttribute("href")).toBe("/login")
  })

  it("인증된 사용자가 아바타를 열면 로그인 정보를 표시한다", async () => {
    // Given
    const user = userEvent.setup()
    server.use(http.get(currentUserEndpoint, () => HttpResponse.json(currentUserResponse)))
    renderAppHeader()
    const identityButton = await screen.findByLabelText("내 로그인 정보 보기")

    // When
    await user.click(identityButton)

    // Then
    const identity = screen.getByRole("region", { name: "내 로그인 정보" })
    expect(identity.textContent).toContain("만나")
    expect(identity.textContent).toContain("만나 사용자")
    expect(identity.textContent).toContain("user@example.com")
  })
})
