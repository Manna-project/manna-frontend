"use client"

import { useLogin } from "@/features/login/hooks/useLogin"

export default function LoginForm() {
  const { login } = useLogin()

  return (
    <form>
      <input type="text" className="bg-white border" />

      <button type="submit" onClick={() => login({ id: "123", password: "1234" })}>
        로그인
      </button>
    </form>
  )
}
