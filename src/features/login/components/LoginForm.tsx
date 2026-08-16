"use client"

import { LoaderCircle, ShieldCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useLogin } from "@/features/login/hooks/useLogin"

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.21Z"
      />
      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.04H3.28v2.52A9.74 9.74 0 0 0 12 21.5Z"
      />
      <path
        fill="#FBBC05"
        d="M6.53 13.59A5.86 5.86 0 0 1 6.22 12c0-.55.1-1.09.31-1.59V7.89H3.28A9.5 9.5 0 0 0 2.25 12c0 1.48.36 2.88 1.03 4.11l3.25-2.52Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.37c1.43 0 2.7.49 3.71 1.46l2.78-2.78C16.84 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.39l3.25 2.52C7.3 8.09 9.46 6.37 12 6.37Z"
      />
    </svg>
  )
}

function KakaoMark() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 3.25c-5.18 0-9.38 3.32-9.38 7.42 0 2.62 1.78 4.92 4.46 6.25l-.91 3.39a.43.43 0 0 0 .64.47l4.03-2.68c.38.04.77.06 1.16.06 5.18 0 9.38-3.32 9.38-7.49S17.18 3.25 12 3.25Z"
      />
    </svg>
  )
}

type OAuthButtonProps = Readonly<{
  provider: "google" | "kakao"
  label: string
  icon: React.ReactNode
  pendingProvider: "google" | "kakao" | null
  onLogin: (provider: "google" | "kakao") => void
}>

function OAuthButton({ provider, label, icon, pendingProvider, onLogin }: OAuthButtonProps) {
  const isPending = pendingProvider === provider

  return (
    <button
      type="button"
      className="group flex min-h-14 w-full items-center gap-4 rounded-[0.9rem] border border-[#e7e7e7] bg-white px-6 text-left text-[1.05rem] font-medium text-[#171717] shadow-[0_2px_0_rgba(19,33,43,0.03)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#cfdad6] hover:shadow-[0_12px_24px_rgba(19,33,43,0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 sm:min-h-16 sm:px-7 sm:text-lg"
      disabled={pendingProvider !== null}
      onClick={() => onLogin(provider)}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center sm:h-9 sm:w-9">
        {isPending ? (
          <LoaderCircle aria-hidden="true" className="h-6 w-6 animate-spin text-accent" />
        ) : (
          icon
        )}
      </span>
      <span className="flex-1">{isPending ? "로그인 페이지로 이동 중..." : label}</span>
      <span
        aria-hidden="true"
        className="text-lg text-zinc-300 transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  )
}

export default function LoginForm() {
  const { login, pendingProvider } = useLogin()
  const searchParams = useSearchParams()
  const hasError = searchParams.has("error") || searchParams.has("loginError")

  return (
    <div className="relative z-10 w-full max-w-[31.5rem] rounded-[1.35rem] bg-white/90 p-3 shadow-[0_28px_80px_rgba(34,51,56,0.12)] backdrop-blur-sm sm:p-4">
      <div className="rounded-[1.05rem] bg-white p-6 sm:p-8">
        <div className="grid gap-3">
          <OAuthButton
            provider="google"
            label="Google로 계속하기"
            icon={<GoogleMark />}
            pendingProvider={pendingProvider}
            onLogin={login}
          />
          <OAuthButton
            provider="kakao"
            label="카카오로 계속하기"
            icon={<KakaoMark />}
            pendingProvider={pendingProvider}
            onLogin={login}
          />
        </div>

        {hasError && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-[#fff4f2] px-3 py-2.5 text-center text-sm font-medium text-error"
          >
            로그인에 실패했어요. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        <p className="mt-6 flex items-center justify-center gap-2 text-xs leading-5 text-zinc-400 sm:mt-7 sm:text-sm">
          <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
          <span>로그인 후 약속이 안전하게 저장됩니다</span>
        </p>
      </div>
    </div>
  )
}
