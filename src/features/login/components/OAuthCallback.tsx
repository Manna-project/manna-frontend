"use client"

import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  getOAuthCallbackDestination,
  type OAuthCallbackStatus,
} from "@/features/login/api/oauthCallback"
import { useCurrentUser } from "@/features/login/hooks/useCurrentUser"

type OAuthCallbackProps = Readonly<{
  hasOAuthError: boolean
}>

const queryStatusMap = {
  pending: "pending",
  error: "session-error",
  success: "authenticated",
} as const satisfies Readonly<Record<"pending" | "error" | "success", OAuthCallbackStatus>>

export function OAuthCallback({ hasOAuthError }: OAuthCallbackProps) {
  const router = useRouter()
  const currentUserQuery = useCurrentUser(!hasOAuthError)
  const callbackStatus = hasOAuthError ? "oauth-error" : queryStatusMap[currentUserQuery.status]
  const destination = getOAuthCallbackDestination(callbackStatus)

  useEffect(() => {
    if (destination !== null) {
      router.replace(destination)
    }
  }, [destination, router])

  return (
    <main className="grid min-h-dvh place-items-center bg-background px-5 text-foreground">
      <div role="status" aria-live="polite" className="text-center">
        <LoaderCircle
          aria-hidden="true"
          className="mx-auto h-8 w-8 animate-spin text-accent motion-reduce:animate-none"
        />
        <h1 className="mt-5 text-xl font-semibold tracking-tight">로그인 정보를 확인하고 있어요</h1>
        <p className="mt-2 text-sm text-zinc-500">잠시만 기다려 주세요.</p>
      </div>
    </main>
  )
}
