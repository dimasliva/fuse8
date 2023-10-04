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
      url: 'https://my-json-server.typicode.com/dimasliva/fuse8_json_server/'
    } as UserState),
    actions: {
      setUser(user: User) {
        this.user = user
      },
  }
})
