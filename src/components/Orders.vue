
<template>
  <div class="container">
    <DeleteOrderModal :show="modalShow" @onClose="onClose" @onDelete="onDelete"/>
    <table>
  <tr>
    <th class="cell" @click="onSort('id')">№</th>
    <th class="cell" @click="onSort('name')">Имя клиента</th>
    <th class="cell" @click="onSort('address')">Адрес</th>
    <th class="cell" @click="onSort('date')">Дата заказа</th>
    <th class="cell" @click="onSort('status')">Дата статус</th>
    <th class="cell" @click="onSort('comment')">Дата Комментарий</th>
    <th class="cell"></th>
  </tr>
  <tr class="tr" :class="{ done: val.status === 'Выполнен'}" v-for="val in events" :key="val.id">
    <td class="cell">{{ val.id }}</td>
    <td class="cell">{{ val.name }}</td>
    <td class="cell">{{ val.address }}</td>
    <td class="cell">{{ val.date }}</td>
    <td class="cell">{{ val.status }}</td>
    <td class="cell">{{ val.comment }}</td>
    <td class="cell">
      <button class="btn" @click="toggleModal(val)" >
        {{ val.status === 'Выполнен' ? '❌' : '✔️'}}
      </button>
    </td>
  </tr>

</table> 
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DeleteOrderModal from './DeleteOrderModal.vue'
import { useUserStore } from '@/stores'
import { type Events } from "@/types/Events";
import { type EventSort } from "@/types/EventSort";
import axios from "axios";

interface State {
  events: Events[],
  modalShow: boolean,
  event: Events,
  event_sort: EventSort
}

export default defineComponent ({
  setup() {
    const userStore = useUserStore()
    return {userStore}
  },
    data(): State {
        return {
            events: [],
            modalShow: false,
            event: {
              id: 0,
              name: '',
              address: '',
              date: '',
              status: '',
              comment: ''
            },
            event_sort: {
              id: false,
              name: false,
              address: false,
              date: false,
              status: false,
              comment: false
            }
        };
    },
    methods: {
      async onSort(sortBy: keyof typeof this.event_sort) {
        try {
            let sort = this.event_sort[sortBy] === false ? 'desc' : 'asc'
            let url = window.location.protocol + '//' + window.location.hostname + ':3001/'
            const res = await axios.get(`${url}events?_sort=${sortBy}&_order=${sort}`);
            this.event_sort[sortBy] = !this.event_sort[sortBy] 
            this.events = res.data
            console.log('this.events', this.events)
          } catch (e) {
            console.error(e);
          }
      },
        toggleModal(val: Events) {
          console.log(this.userStore.user)
          if(this.userStore.user.role === 'ADMIN') {
            if(val.status === 'Выполнен') {
              this.event = val
              console.log('event', this.event)
              this.modalShow = !this.modalShow;
           } else {
            this.changeStatus(val)
           }
          }

        },
        async changeStatus(val: Events) {
          try {
             let url = window.location.protocol + '//' + window.location.hostname + ':3001/'
            const res = await axios.patch(`${url}events/${val.id}`, {
              status: val.status === 'Новый' ? 'Выполнен' : 'Новый'
            });

            this.getEvents()
            console.log('this.events', this.events)
          } catch (e) {
            console.error(e);
          }
        },
        onClose() {
          this.modalShow = false;
        },
        async onDelete() {
          try {
            let url = window.location.protocol + '//' + window.location.hostname + ':3001/'
            const res = await axios.delete(`${url}events/${this.event.id}`);

            this.getEvents()
            console.log('this.events', this.events)
          } catch (e) {
            console.error(e);
          }
          this.onClose()
          console.log('event', this.event)
        },
        async getEvents() {
          try {
            let url = window.location.protocol + '//' + window.location.hostname + ':3001/'
            const res = await axios.get(`${url}events`);

            this.events = res.data;
            console.log('this.events', this.events)
          } catch (e) {
            console.error(e);
          }
        }
    },
    async created() {
      this.getEvents()

    },
    mounted() {
    },
    components: { DeleteOrderModal }
})
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  width: 100%;
  height: 100%;
}
table,th,td {
  border: 1px solid black;
  border-collapse: collapse;
}
  .cell {
    padding: 20px;
  }
  .btn {
    border: 0px;
    padding: 4px; 
    cursor: pointer;
  }
  .tr.done {
    color: lightgray;
  }
  .modal {
    position: absolute
  }
  th.cell {
    cursor: pointer;
    user-select: none;
  }
</style>