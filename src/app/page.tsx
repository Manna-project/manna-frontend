import { MeetingSearchForm } from "@/features/meeting-search/MeetingSearchForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-dvh bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12">
        <section className="mx-auto grid min-h-[calc(100dvh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-border-soft bg-white/70 px-3 py-1 text-sm font-medium text-accent-strong shadow-sm">
              Mannamap frontend starter
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">모두에게 적당한 약속 장소를</span>{" "}
              <span className="block">빠르게 좁혀보세요.</span>
            </h1>
            <p className="mt-6 max-w-xl break-keep text-pretty text-lg leading-8 text-zinc-700">
              Next.js App Router, TypeScript, Tailwind, Zod, React Hook Form
              기반으로 바로 기능을 얹을 수 있는 프론트엔드 시작점입니다.
            </p>
            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              {["출발지 입력", "조건 정리", "후보 비교"].map((item) => (
                <div
                  className="rounded-xl border border-border-soft bg-white/75 p-4 text-sm font-medium shadow-sm"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <MeetingSearchForm />
        </section>
      </main>
    </QueryClientProvider>
  );
}
