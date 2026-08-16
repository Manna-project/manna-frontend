"use client"

import { useState } from "react"
import { getOAuthUrl, type OAuthProvider } from "@/features/login/api/oauth"
import { clientEnv } from "@/shared/config/env"

export function useLogin() {
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(null)

  const login = (provider: OAuthProvider) => {
    setPendingProvider(provider)
    window.location.assign(getOAuthUrl(clientEnv.NEXT_PUBLIC_API_BASE_URL, provider))
  }

  return {
    login,
    pendingProvider,
  }
}
