<template>
  <div class="container">
    <div class="form">
      <h2>Добавить заказ</h2>
      <input v-model="event.name" placeholder="Введите ваше имя"/>
      <input v-model="event.address" placeholder="Введите ваш адрес"/>
      <input v-model="event.comment" placeholder="Комментарий"/>
      {{ added === true ? 'Заказ добавлен' : ''}}
      <button @click="addEvent">Добавить заказ</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores'
import { type Events } from "@/types/Events";
import axios from "axios";

interface State {
  events:Events[],
  event: Events,
  added: Boolean
}

export default defineComponent ({
  setup() {
    const userStore = useUserStore()
    return {userStore}
  },
    data(): State {
        return {
          events: [],
          event: {
            id: 0,
            name: '',
            address: '',
            date: '',
            status: '',
            comment: ''
          },
          added: false
        };
    },
    methods: {
      async getEvents() {
        const res = await axios.get(`${this.userStore.url}events`);
        res.data
      },
      async addEvent() {
        if(this.event.name.length !== 0 && this.event.address.length !== 0) {
          await axios.get(`${this.userStore.url}events`).then(async val => {
            console.log('events', val.data)
            const month = new Date().toLocaleString('default', { month: 'long' });
            let date = `${new Date().getDay()} ${month} ${new Date().getFullYear()}`
            await axios.post(`${this.userStore.url}events`, {
              id: Number(val.data[val.data.length-1].id) + 1,
              "name": this.event.name,
              "address": this.event.address,
              "date": date,
              "status": "Новый",
              "comment": this.event.comment
            }).then(() => {
              this.added = true
            })
          })

          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
          this.added = false
        }

        // this.userStore.addEvent(this.event)
      }
    },

})
</script>
<style>
  .container {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .form {
    display: flex;  
    flex-direction: column;
    width: 250px;
  }
  .form input {
    margin: 10px 0px;
    padding: 6px 4px;
    outline: none;
  }
  .form button {
    width: 200px;
    padding:6px 10px;
    border: 0px;
    cursor: pointer;
  }
</style>
