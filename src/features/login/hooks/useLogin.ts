type LoginCredentials = Readonly<{
  id: string
  password: string
}>

export function useLogin() {
  const login = (credentials: LoginCredentials) => {
    void credentials
    // TODO DEBT:auth-contract Replace the prototype with the agreed authentication mutation.
  }

  return {
    login,
  }
}
