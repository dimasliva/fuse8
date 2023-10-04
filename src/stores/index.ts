import { type User } from "@/types/User";
import { type Events } from "@/types/Events";
import { defineStore } from 'pinia'

export type UserState = {
  user: User,
  events: {
    "id": Number,
    "name": String,
    "address": String,
    "date": String,
    "status": String,
    "comment": String
}[],
event: {
  "id": Number,
  "name": String,
  "address": String,
  "date": String,
  "status": String,
  "comment": String
}
};

export const useUserStore = defineStore({
  id: "mainStore",
  state: () =>
    ({
      user: {
        user: '',
        password: '',
        name: '',
        role: ''
      }
    } as UserState),
    actions: {
      setUser(user: User) {
        this.user = user
      },
  }
})
