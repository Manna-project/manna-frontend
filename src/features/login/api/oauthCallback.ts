export type OAuthCallbackDestination = "/" | "/login?error=oauth"

export function getOAuthCallbackDestination(
  error: string | readonly string[] | undefined,
): OAuthCallbackDestination {
  return error === undefined ? "/" : "/login?error=oauth"
}
