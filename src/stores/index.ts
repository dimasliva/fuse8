import { type User } from "@/types/User";
import { defineStore } from 'pinia'

export type UserState = {
  user: User,
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
