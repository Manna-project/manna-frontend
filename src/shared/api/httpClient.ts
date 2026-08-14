import axios from "axios"
import { clientEnv } from "@/shared/config/env"

export const httpClient = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
})
