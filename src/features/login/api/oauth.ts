export type OAuthProvider = "google" | "kakao"

const oauthPaths: Readonly<Record<OAuthProvider, string>> = {
  google: "/api/v1/oauth2/google",
  kakao: "/api/v1/oauth2/kakao",
}

export function getOAuthUrl(apiBaseUrl: string, provider: OAuthProvider): string {
  return new URL(oauthPaths[provider], `${apiBaseUrl.replace(/\/$/, "")}/`).toString()
}
