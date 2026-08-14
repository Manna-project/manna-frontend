import { z } from "zod"

export const userSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().trim().min(1),
})

export const usersResponseSchema = z.object({
  users: z.array(userSchema),
})

export type User = z.infer<typeof userSchema>
