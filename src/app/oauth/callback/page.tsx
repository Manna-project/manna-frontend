import { redirect } from "next/navigation"
import { getOAuthCallbackDestination } from "@/features/login/api/oauthCallback"

type OAuthCallbackPageProps = Readonly<{
  searchParams: Promise<{
    error?: string | readonly string[]
  }>
}>

export default async function OAuthCallbackPage({ searchParams }: OAuthCallbackPageProps) {
  const { error } = await searchParams

  redirect(getOAuthCallbackDestination(error))
}
