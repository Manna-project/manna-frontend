import { z } from "zod"
import { httpClient } from "@/shared/api/httpClient"

const csrfTokenSchema = z.object({
  headerName: z.literal("X-XSRF-TOKEN"),
  parameterName: z.literal("_csrf"),
  token: z.string().min(1),
})

export async function logoutCurrentUser(): Promise<void> {
  const { data } = await httpClient.get<unknown>("/api/v1/auth/csrf")
  csrfTokenSchema.parse(data)

  await httpClient.post<void>("/api/v1/auth/logout")
}
