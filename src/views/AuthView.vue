<template>
  <div class="wrapper">
    <div class="form">
      <input v-model="user.user" placeholder="username"/>
      <div>
        <input type="password" v-model="user.password" :class="{err: isErr}" placeholder="password"/>
        <span class="error">{{ isErr === true ? 'Неверный логин пароль' : ''}}</span>
      </div>
      <button @click="onAuth" class="btn">Войти</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/index'
import { type User } from "@/types/User";
import router from '@/router';
import axios from "axios";

interface State {
  user: User,
  isErr: Boolean,
  users: User[]
}

export default defineComponent ({
  setup() {
    const userStore = useUserStore()
    return {userStore}
  },
    data(): State {
        return {
          user: {
            user: '',
            password: '',
            name: '',
            role: ''
          },
          isErr: false,
          "users": [],
        };
    },
    methods: {
      setError() {
        this.isErr = true
      },
      onAuth() {
        if(this.user.password.length < 8) {
          this.setError()
        } else {
          this.getUser(this.user)
        }
      },
      async getUser(user: User) {
        console.log(window.location.href.replace(/auth/, ''))
        try {
          const res = await axios.get(`${window.location.href.replace(/auth/, '')}users?user=${user.user}&password=${user.password}`);

          if(res.data.length === 0) {
            this.setError()
            return
          }
          this.isErr = false
          console.log('this.user', res.data)
          this.userStore.setUser(res.data[0]);
          router.push({name: 'orders'})
        } catch (e) {
          console.error(e);
        }
    }
  }
})
</script>

<style scoped>
.wrapper {
  margin: 100px;
}
  .form {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    background-color: #2081E3;
    padding: 60px;
    padding-bottom: 40px;
    padding-right: 200px;
  }
  .form input {
    width: 250px;
    outline: none;
    padding: 10px;
  }
  .btn {
    background-color: white;
    border: 0px;
    padding: 8px 40px;
    cursor: pointer;
  }
  .err {
    border: 2px solid red;
  }
  .error {
    color: white;
  }
</style>
