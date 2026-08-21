import Image from "next/image"
import { Suspense } from "react"
import LoginForm from "@/features/login/components/LoginForm"

export default function Login() {
  return (
    <main
      aria-labelledby="login-title"
      className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-[#eaf4ef] opacity-60 blur-3xl" />
        <div className="absolute -right-28 top-12 h-96 w-96 rounded-full bg-[#f7eee5] opacity-70 blur-3xl" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-45"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-50 665C170 520 294 704 475 615C653 527 781 561 946 451C1105 345 1237 465 1495 267"
            stroke="#dfeae4"
            strokeWidth="24"
          />
          <path
            d="M-50 665C170 520 294 704 475 615C653 527 781 561 946 451C1105 345 1237 465 1495 267"
            stroke="#f8fbf9"
            strokeWidth="11"
          />
          <path
            d="M-100 210L390 790M278 -50L730 950M962 -50L707 900M1255 -50L1120 950"
            stroke="#e8eee9"
            strokeWidth="1"
          />
          <path d="M0 402L1440 402M0 746L1440 746" stroke="#edf1ed" strokeWidth="1" />
        </svg>
        <span className="absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-[#ff8575] shadow-[0_0_0_5px_rgba(255,133,117,0.15)]" />
        <span className="absolute right-[15%] top-[35%] h-3 w-3 rounded-full bg-[#ff8575] shadow-[0_0_0_5px_rgba(255,133,117,0.15)]" />
        <span className="absolute bottom-[20%] left-[30%] h-3 w-3 rounded-full bg-[#ff8575] shadow-[0_0_0_5px_rgba(255,133,117,0.15)]" />
      </div>

      <div className="flex w-full max-w-2xl flex-col items-center">
        <header className="mb-8 text-center sm:mb-10">
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[0.7rem] bg-[#fffaf3] shadow-[0_8px_18px_rgba(31,122,77,0.18)]">
              <Image
                src="/mannamap-icon.png"
                alt="Mannamap 아이콘"
                width={36}
                height={36}
                priority
                className="h-full w-full scale-[1.08] object-cover"
              />
            </span>
            <span className="text-2xl font-semibold tracking-[-0.04em] text-brand-navy">Manna</span>
          </div>
          <h1
            id="login-title"
            className="text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
          >
            친구들과 만나는 가장 좋은 중간 지점
          </h1>
          <p className="mt-3 text-base text-zinc-500 sm:text-lg">
            약속을 만들고, 장소를 찾고, 다음 만남까지 가볍게 이어가세요.
          </p>
        </header>

        <Suspense
          fallback={
            <div className="h-[21rem] w-full max-w-[31.5rem] rounded-[1.35rem] border border-white/90 bg-white/70 shadow-[0_28px_80px_rgba(34,51,56,0.08)]" />
          }
        >
          <LoginForm />
        </Suspense>

        <footer className="mt-8 text-center text-xs leading-6 text-zinc-400 sm:mt-10 sm:text-sm">
          <p>로그인하면 서비스 이용약관과 개인정보처리방침에 동의하게 됩니다.</p>
          <nav
            aria-label="정책 링크"
            className="mt-2 flex justify-center gap-5 font-medium text-accent"
          >
            <a
              className="transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              href="#privacy"
            >
              개인정보처리방침
            </a>
            <a
              className="transition-colors hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              href="#terms"
            >
              이용약관
            </a>
          </nav>
        </footer>
      </div>
    </main>
  )
}
