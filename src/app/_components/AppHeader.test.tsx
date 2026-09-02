// @vitest-environment jsdom

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HttpResponse, http } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import { currentUserQueryKey } from "@/features/login/hooks/useCurrentUser"
import { httpClient } from "@/shared/api/httpClient"
import { AppHeader } from "./AppHeader"

const { replace } = vi.hoisted(() => ({
  replace: vi.fn<(destination: string) => void>(),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}))

const currentUserEndpoint = httpClient.getUri({ url: "/api/v1/users/me" })
const csrfEndpoint = httpClient.getUri({ url: "/api/v1/auth/csrf" })
const logoutEndpoint = httpClient.getUri({ url: "/api/v1/auth/logout" })

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

function renderAppHeader() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const renderedHeader = render(
    <QueryClientProvider client={queryClient}>
      <AppHeader />
    </QueryClientProvider>,
  )

  return { ...renderedHeader, queryClient }
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

  it("로그아웃하면 세션 캐시를 비우고 로그인 화면으로 이동한다", async () => {
    // Given
    const user = userEvent.setup()
    server.use(
      http.get(currentUserEndpoint, () => HttpResponse.json(currentUserResponse)),
      http.get(csrfEndpoint, () =>
        HttpResponse.json({
          headerName: "X-XSRF-TOKEN",
          parameterName: "_csrf",
          token: "csrf-token",
        }),
      ),
      http.post(logoutEndpoint, () => new HttpResponse(null, { status: 204 })),
    )
    const { queryClient } = renderAppHeader()
    await user.click(await screen.findByLabelText("내 로그인 정보 보기"))

    // When
    await user.click(screen.getByRole("button", { name: "로그아웃" }))

    // Then
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/login"))
    expect(queryClient.getQueryData(currentUserQueryKey)).toBeUndefined()
  })

  it("로그아웃에 실패하면 메뉴에 다시 시도할 수 있는 오류를 표시한다", async () => {
    // Given
    const user = userEvent.setup()
    server.use(
      http.get(currentUserEndpoint, () => HttpResponse.json(currentUserResponse)),
      http.get(csrfEndpoint, () =>
        HttpResponse.json({
          headerName: "X-XSRF-TOKEN",
          parameterName: "_csrf",
          token: "csrf-token",
        }),
      ),
      http.post(logoutEndpoint, () => new HttpResponse(null, { status: 403 })),
    )
    renderAppHeader()
    await user.click(await screen.findByLabelText("내 로그인 정보 보기"))

    // When
    await user.click(screen.getByRole("button", { name: "로그아웃" }))

    // Then
    const errorMessage = await screen.findByRole("alert")
    expect(errorMessage.textContent).toContain("로그아웃에 실패했어요. 다시 시도해 주세요.")
    expect(replace).not.toHaveBeenCalled()
  })
})
