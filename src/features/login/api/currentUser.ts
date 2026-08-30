import { type CurrentUser, currentUserSchema } from "@/entities/currentUser.schema"
import { httpClient } from "@/shared/api/httpClient"

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await httpClient.get<unknown>("/api/v1/users/me")

  return currentUserSchema.parse(data)
}
