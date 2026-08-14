"use client"

import { useQuery } from "@tanstack/react-query"
import { usersResponseSchema } from "@/entities/user.schema"
import { httpClient } from "@/shared/api/httpClient"

const userQueryKeys = {
  all: ["users"] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: userQueryKeys.all,
    queryFn: async () => {
      const { data } = await httpClient.get<unknown>("/users")
      return usersResponseSchema.parse(data).users
    },
  })
}
