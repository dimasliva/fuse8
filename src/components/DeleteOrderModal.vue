<template>
  <div class="container" @click="onClose" v-show="show">
    <div class="modal" @click.stop="">
      <div class="title">Вы действительно хотите удалить заказ?</div>
      <div class="btns">
        <button @click="onDelete" class="btn">Ок</button>
        <button type="button" @click="onClose" class="btn">Отмена</button>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'


interface State {

}

export default defineComponent ({
  
  data(): State {
        return {

        }
  },
  props:{show: Boolean, event: Object},
  setup(props, { emit }) {
    const onClose = () => {
      emit("onClose");
    };
    const onDelete = (event: Event) => {
      emit("onDelete");
    };
    return {
      onClose, onDelete
    };
  },
})
</script>
<style scoped>
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal {

    width: 500px;
    height: 300px;
    background-color: #2081E3;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 60px 20px;
    margin-top: 40px;
  }
  .title {
    margin-top: 20px;
    font-weight: bold;
    font-size: large;
  }
  .btns {
    width: 70%;
    display: flex;
    justify-content: space-between;
  }
  .btn {
    border: 0px;
    width: 100px;
    height: 40px;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
  }
</style>
