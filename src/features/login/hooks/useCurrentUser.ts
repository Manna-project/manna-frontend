"use client"

import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "@/features/login/api/currentUser"

const currentUserQueryKey = ["current-user"] as const

export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    enabled,
    retry: false,
  })
}
