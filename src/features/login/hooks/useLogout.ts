"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { logoutCurrentUser } from "@/features/login/api/logout"

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: logoutCurrentUser,
    onSuccess: () => {
      queryClient.clear()
      router.replace("/login")
    },
  })
}
