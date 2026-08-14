"use client"

import { useUsers } from "@/features/user/hooks/useUsers"

export function UserList() {
  const { data: users = [] } = useUsers()

  return (
    <div>
      {users.map((user) => (
        <span key={user.id}>{user.name}</span>
      ))}
    </div>
  )
}
