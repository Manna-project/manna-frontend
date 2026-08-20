import { z } from "zod"

export const currentUserSchema = z.object({
  entityId: z.uuid(),
  email: z.email(),
  name: z.string().trim().min(1),
  nickname: z.string().trim().min(1).nullable(),
  profileImage: z.url().nullable(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
