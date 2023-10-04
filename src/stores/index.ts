import { type User } from "@/types/User";
import { defineStore } from 'pinia'

export type UserState = {
  user: User,
  url: String
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
      },
      url: window.location.protocol + '//' + window.location.hostname + ':3001/'
    } as UserState),
    actions: {
      setUser(user: User) {
        this.user = user
      },
  }
})
