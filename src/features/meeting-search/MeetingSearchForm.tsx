"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2, LoaderCircle, MapPin, Search } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const meetingSearchSchema = z.object({
  origin: z.string().trim().min(2, "출발지는 두 글자 이상 입력해 주세요."),
  destinationHint: z.string().trim().min(2, "희망 지역은 두 글자 이상 입력해 주세요."),
  travelMode: z.enum(["transit", "walk", "car"]),
})

type MeetingSearchValues = z.infer<typeof meetingSearchSchema>

type SearchStatus =
  | { readonly kind: "idle" }
  | { readonly kind: "success"; readonly message: string }

const travelModeOptions: readonly {
  readonly label: string
  readonly value: MeetingSearchValues["travelMode"]
}[] = [
  { label: "대중교통", value: "transit" },
  { label: "도보", value: "walk" },
  { label: "자동차", value: "car" },
] as const

export function MeetingSearchForm() {
  const [searchStatus, setSearchStatus] = useState<SearchStatus>({
    kind: "idle",
  })

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<MeetingSearchValues>({
    defaultValues: {
      destinationHint: "",
      origin: "",
      travelMode: "transit",
    },
    resolver: zodResolver(meetingSearchSchema),
  })

  const submitSearch = async (values: MeetingSearchValues) => {
    setSearchStatus({ kind: "idle" })
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 500)
    })
    setSearchStatus({
      kind: "success",
      message: `${values.origin} 기준으로 ${values.destinationHint} 주변 후보를 찾을 준비가 됐습니다.`,
    })
  }

  return (
    <form
      className="rounded-xl border border-border-soft bg-white p-5 shadow-[0_24px_70px_rgba(23,23,23,0.10),0_2px_10px_rgba(23,23,23,0.06)] sm:p-6"
      onSubmit={handleSubmit(submitSearch)}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-muted-surface text-accent-strong">
          <MapPin aria-hidden="true" size={20} />
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">장소 추천 조건</h2>
          <p className="mt-1 text-sm text-zinc-600">검증된 폼 구조를 확장해 API와 연결하세요.</p>
        </div>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium">출발지</span>
          <input
            aria-describedby={errors.origin ? "origin-error" : undefined}
            aria-invalid={Boolean(errors.origin)}
            className={`mt-2 min-h-11 w-full rounded-md border bg-background px-3 text-base outline-none transition-colors focus:ring-2 ${
              errors.origin
                ? "border-error focus:border-error focus:ring-error/15"
                : "border-border-soft focus:border-accent focus:ring-accent/20"
            }`}
            placeholder="예: 강남역"
            {...register("origin")}
          />
          {errors.origin && (
            <span className="mt-2 flex items-center gap-1.5 text-sm text-error" id="origin-error">
              <AlertCircle aria-hidden="true" size={14} />
              <span>{errors.origin.message}</span>
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium">희망 지역</span>
          <input
            aria-describedby={errors.destinationHint ? "destination-error" : undefined}
            aria-invalid={Boolean(errors.destinationHint)}
            className={`mt-2 min-h-11 w-full rounded-md border bg-background px-3 text-base outline-none transition-colors focus:ring-2 ${
              errors.destinationHint
                ? "border-error focus:border-error focus:ring-error/15"
                : "border-border-soft focus:border-accent focus:ring-accent/20"
            }`}
            placeholder="예: 성수, 홍대, 종로"
            {...register("destinationHint")}
          />
          {errors.destinationHint && (
            <span
              className="mt-2 flex items-center gap-1.5 text-sm text-error"
              id="destination-error"
            >
              <AlertCircle aria-hidden="true" size={14} />
              <span>{errors.destinationHint.message}</span>
            </span>
          )}
        </label>

        <fieldset>
          <legend className="text-sm font-medium">이동 방식</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {travelModeOptions.map((option) => (
              <label
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-border-soft bg-background px-3 text-sm font-medium transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-white"
                key={option.value}
              >
                <input
                  className="sr-only"
                  type="radio"
                  value={option.value}
                  {...register("travelMode")}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-4 font-semibold text-white transition-colors hover:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
        ) : (
          <Search aria-hidden="true" size={18} />
        )}
        {isSubmitting ? "후보 찾는 중" : "후보 장소 찾기"}
      </button>

      {searchStatus.kind === "success" && (
        <p
          aria-live="polite"
          className="mt-4 flex items-start gap-2 rounded-md bg-muted-surface px-3 py-2 text-sm text-accent-strong"
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
          <span>{searchStatus.message}</span>
        </p>
      )}
    </form>
  )
}
