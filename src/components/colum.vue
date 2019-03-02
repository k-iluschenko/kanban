<template>
  <div class="board__colum" :data-type="type">
    <div class="colum__header" :class="color">{{header}} ({{count}})</div>
    <div class="colum__section"
    @dragover.prevent @drop="dragFinish(type, $event)"
    >

      <!-- <draggable v-model="myArray" :options="{group:'type'}" @start="drag=true" @end="drag=false"> -->
  
    <template v-for='list in lists'>
        <card-item 
          :key='list.id'
          :list='list'
          :draggable="true"
          :dragstart="dragStart"
          :dragend="dragEnd"
        />
      </template>
<!-- </draggable> -->
     
      <add-card-item v-if="!isShow" :type="type" :isError="isError" />
    </div>
    <div class="colum__footer" v-if="isShow" >
      <div class="button" @click="showButton"  @dragover.prevent @drop="dragFinish(type, $event)">Добавить карточку</div>
    </div>
    <div class="colum__footer" v-else>
      <div class="button active" @click="addCard">
        Добавить карточку
      </div>
      <div class="clear" @click="showButton"></div>
    </div>
  </div>
</template>
<script>
import cardItem from './card.vue';
import addCardItem from './cardAdd.vue';

export default {
  name: 'colum',
  props: {
    header: String,
    color: String,
    lists: Array,
    type: String,
  },
  data() {
    return {
      isShow: true,
      isError: false,
      draggin: this.type,
    };
  },
  methods: {
    showButton() {
      this.isShow = !this.isShow;
      this.isError = false;
    },
    addCard() {
      if (Object.keys(this.getNewCard).length) {
        this.$store.dispatch('addCard', this.getNewCard);
        this.showButton();
      } else {
        this.isError = true;
      }
    },
    dragStart(which, ev) {
      console.log('dragStart', ev);
      console.log('dragStart', which);
      ev.dataTransfer.setData('Text', which);
      ev.dataTransfer.dropEffect = 'move';
      // this.dragging = which;
      this.$store.commit('setDragging', which);
      console.log('dragStart', this.dragging);
    },
    dragEnd(ev) {
      console.log('dragEnd', ev);
      this.$store.commit('setDragging', -1);
    },
    dragFinish(to, ev) {
      console.log('dragFinish', to);
      console.log('dragFinish', this.dragging);

      this.moveItem(this.dragging, to);
    // ev.target.style.marginTop = '2px'
    // ev.target.style.marginBottom = '2px'
    },
    moveItem(from, to) {
      console.log(from, to);
      this.$store.commit('updateCard', { id: from, type: to });
      // if (to === -1) {
      //   this.removeItemAt(from);
      // } else {
      //   this.todos.splice(to, 0, this.todos.splice(from, 1)[0]);
      // }
    },
  },
  computed: {
    dragging() {
      return this.$store.getters.getDragging;
    },
    count() {
      if (!this.lists) {
        return 0;
      }
      return this.lists.length;
    },
    getNewCard() {
      return this.$store.getters.getNewCard;
    },
  },
  components: {
    cardItem, addCardItem,
  },

};
</script>
<style lang="scss">
$color-button: #606162;
$color-button-active-text: #A9ABAA;
$color-button-text: #82838A;
$color-button-hover: #27272D;
$color-bg-colum: #303038;

.board__colum {
  background: $color-bg-colum;
  min-width: 250px;
  margin: 0 10px 24px;
  display: flex;
  flex-direction: column;
}
.colum__section{
  margin: 0 8px 8px;
  font-size: 14px;
}
.colum__footer {
  text-align: left;
}
.button {
  position: relative;
  cursor: pointer;
  color: $color-button-text;
  padding: 7px;
  display: flex;
  line-height: 24px;
  font-size: 14px;
  &:hover {
    background: $color-button-hover;
  }
  &::before {
    position: relative;
    content: "";
    width: 24px;
    height: 24px;
    background-color: $color-button-text;
    -webkit-mask: url('../assets/img/baseline-add-24px.svg')
      no-repeat center;
    mask: url('../assets/img/baseline-add-24px.svg')
      no-repeat center;
  }
  &.active{
    cursor: pointer;
    display: inline-block;
    background: $color-button;
    padding: 7px;
    margin: 0 8px 8px;
    width: 75%;
    text-align: center;
    color: $color-button-active-text;
    line-height: 18px;
    width: 150px;
    &::before {
      content: "";
      width: 0px;
      height: 0px;
    }
  }
}
.clear {
  cursor: pointer;
  position: relative;
  top: 7px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: $color-button-text;
  -webkit-mask: url('../assets/img/baseline-clear-24px.svg') no-repeat center;
  mask: url('../assets/img/baseline-clear-24px.svg') no-repeat center;
  }

@media (max-width: 1080px) {
  .board__colum{
    &:nth-child(n + 3) {
      order: 1;
    }
  }
}
</style>
