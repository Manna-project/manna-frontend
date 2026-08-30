import type { CurrentUser } from "@/entities/currentUser.schema"

export function getUserDisplayName(user: CurrentUser) {
  return user.nickname ?? user.name
}

export function getUserInitial(user: CurrentUser) {
  return Array.from(getUserDisplayName(user)).at(0) ?? "M"
}
