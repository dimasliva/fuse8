<template>
  <div class="wrapper">
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="link" to="/">Все заказы</router-link>
          <router-link class="link" to="/add">Добавить заказ</router-link>
        </li>
        <li class="nav-item">
          <router-link class="link name" to="/">{{user.name}}</router-link>
            <button @click="auth" class="btn">
                {{user.user.length === 0 ? 'Войти' : 'Выйти'}}
            </button>
        </li>
      </ul>
    </nav>
    <RouterView />
  </div>
</template>
<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import router from './router'
import { type User } from "@/types/User";
import { useUserStore } from '@/stores/index'

interface State {
  user: User
}
export default defineComponent ({

  setup() {
    const userStore = useUserStore()
    return {userStore}
  },
    data(): State {
        return {
          user: {
            "user": "",
            "password": "",
            "name": "",
            "role": ""
          },
          
        };
    },
    methods: {
      auth() {
        if(this.user.user.length > 0) {
          this.userStore.setUser({
            "user": "",
            "password": "",
            "name": "",
            "role": ""
          })
        } 
        router.push({path: 'auth'})
      }
    },
    mounted() {
    },
    watch: {
      $route(to) {
        if(to.name !== 'auth' && this.user.name.length === 0) {
          router.push({name: 'auth'})
        }
        console.log('1111', to)
      },
      userStore: {
        handler(val) {
          console.log('app', val.user)
          this.user = this.userStore.user
        }, 
        deep: true
      }
    }
})
</script>
<style scoped>

  .navbar {
    width: 100%;
    background-color: #165996;
  }
  .navbar-nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-item {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .nav-item {
    display: flex;
    padding: 20px;

    height: 100%;
  }
  .link {
    color: white;
    text-decoration: none;
    margin: 0px 20px;
  }
  .name {
  }
  .btn {
    border: 0px;
    padding: 8px 20px;
    color: black;
    cursor: pointer;
  }
</style>
