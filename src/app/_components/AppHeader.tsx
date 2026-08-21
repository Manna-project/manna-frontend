"use client"

import { ChevronDown, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCurrentUser } from "@/features/login/hooks/useCurrentUser"
import { getUserDisplayName, getUserInitial } from "./userIdentity"

export function AppHeader() {
  const currentUserQuery = useCurrentUser()

  return (
    <header className="border-b border-border-soft/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2.5 rounded-lg pr-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20"
          aria-label="Manna 홈"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[0.7rem] bg-[#fffaf3] shadow-[0_6px_16px_rgba(23,59,96,0.12)]">
            <Image
              src="/mannamap-icon.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-full w-full scale-[1.08] object-cover"
            />
          </span>
          <span className="text-xl font-semibold tracking-[-0.04em] text-brand-navy sm:text-2xl">
            Manna
          </span>
        </Link>

        {currentUserQuery.isPending && (
          <div
            aria-label="로그인 정보 불러오는 중"
            role="status"
            className="h-11 w-11 animate-pulse rounded-full bg-muted-surface motion-reduce:animate-none"
          />
        )}

        {currentUserQuery.isError && (
          <Link
            href="/login"
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-border-soft bg-white px-4 text-sm font-semibold text-brand-navy shadow-sm transition-colors hover:border-accent/40 hover:text-accent-strong focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20"
          >
            로그인
          </Link>
        )}

        {currentUserQuery.data && (
          <details className="group relative">
            <summary
              className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 [&::-webkit-details-marker]:hidden"
              aria-label="내 로그인 정보 보기"
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full bg-brand-navy text-base font-semibold text-white shadow-[0_6px_18px_rgba(23,59,96,0.2)] transition-transform group-open:scale-[0.96]"
              >
                {getUserInitial(currentUserQuery.data)}
              </span>
              <ChevronDown
                aria-hidden="true"
                className="h-4 w-4 text-zinc-500 transition-transform group-open:rotate-180"
              />
            </summary>

            <section
              aria-label="내 로그인 정보"
              className="absolute right-0 z-20 mt-3 w-[min(18rem,calc(100vw-2.5rem))] rounded-xl border border-border-soft bg-white p-4 shadow-[0_20px_48px_rgba(23,35,44,0.14)]"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eaf4ef] font-semibold text-accent-strong"
                >
                  {getUserInitial(currentUserQuery.data)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">
                    {getUserDisplayName(currentUserQuery.data)}
                  </p>
                  {currentUserQuery.data.nickname && (
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {currentUserQuery.data.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="my-4 h-px bg-border-soft/80" />
              <p className="flex min-w-0 items-center gap-2 text-sm text-zinc-600">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span className="truncate">{currentUserQuery.data.email}</span>
              </p>
            </section>
          </details>
        )}
      </div>
    </header>
  )
}
