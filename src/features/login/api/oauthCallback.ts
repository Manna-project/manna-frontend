export type OAuthCallbackStatus = "pending" | "authenticated" | "oauth-error" | "session-error"

export type OAuthCallbackDestination = "/" | "/login?error=oauth" | "/login?error=session" | null

const callbackDestinations = {
  pending: null,
  authenticated: "/",
  "oauth-error": "/login?error=oauth",
  "session-error": "/login?error=session",
} as const satisfies Readonly<Record<OAuthCallbackStatus, OAuthCallbackDestination>>

export function getOAuthCallbackDestination(status: OAuthCallbackStatus): OAuthCallbackDestination {
  return callbackDestinations[status]
}
