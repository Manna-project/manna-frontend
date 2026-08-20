import { OAuthCallback } from "@/features/login/components/OAuthCallback"

type OAuthCallbackPageProps = Readonly<{
  searchParams: Promise<{
    error?: string | readonly string[]
  }>
}>

export default async function OAuthCallbackPage({ searchParams }: OAuthCallbackPageProps) {
  const { error } = await searchParams

  return <OAuthCallback hasOAuthError={error !== undefined} />
}
