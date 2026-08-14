import { z } from "zod"

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url().default("http://localhost:8080"),
})

export function parseClientEnv(input: unknown) {
  return clientEnvSchema.parse(input)
}

export const clientEnv = parseClientEnv({
  NEXT_PUBLIC_API_BASE_URL: process.env["NEXT_PUBLIC_API_BASE_URL"],
})
