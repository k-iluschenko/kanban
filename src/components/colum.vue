<template>
  <div class="board__colum" >
    <div class="colum__header " :class="color">{{header}} ({{lists.length}})</div>
    <div class="colum__section">
      <Container
        group-name="1"
        :get-child-payload="getChildPayload1"
        @drop="onDrop('localLists', $event)"
      >
        <Draggable v-for="card in lists" :key="card.id">
          <card-item :card="card" :type="type" />
        </Draggable>
      </Container>
      <add-card-item
        v-if="!isShow"
        :isError="isError"
        :type="type"
        :addCard="addCard"
        :show="showButton"
      />
    </div>
    <div class="colum__footer" v-if="isShow" >
      <div class="button" @click="showButton">
        <div class="add_card"></div>
        Добавить карточку
      </div>
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
import { Container, Draggable } from 'vue-smooth-dnd';
import { applyDrag } from '../assets/utils';

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
  updated() {
    this.localLists = this.lists;
  },
  data() {
    return {
      isShow: true,
      isError: false,
      localLists: this.lists,
    };
  },
  watch: {
    localLists(value) {
      const variable = `${this.type}List`;
      this.$store.commit('setLIst', { list: value, variable });
    },
  },
  methods: {
    showButton() {
      this.isShow = !this.isShow;
      this.isError = false;
    },
    addCard(e) {
      const activeButton = e.currentTarget ? Array.from(e.currentTarget.classList).find(item => item === 'active') : '';
      if (e.keyCode === 13 || activeButton === 'active') {
        if (Object.keys(this.getNewCard).length) {
          this.$store.dispatch('addCard', { card: this.getNewCard, type: this.type });
          this.showButton();
        } else {
          this.isError = true;
          const self = this;
          setTimeout(() => { self.isError = false; }, 1000);
        }
      }
    },
    getChildPayload1(index) {
      return this.lists[index];
    },
    closeTask() {
      const variable = `${this.type}List`;
      this.$store.dispatch('deleteCard', { card: this.list, variable });
    },
    onDrop(collection, dropResult) {
      this[collection] = applyDrag(this[collection], dropResult);
    },
  },
  computed: {
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
    cardItem, addCardItem, Container, Draggable,
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
  margin: 8px 8px 0;
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
.clear, .add_card{
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
  &:before,
  &:after{
    content: "";
    position: absolute;
    background-color: $color-button-text;;
    transition: transform 0.25s ease-out;
  }
  &:before{
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    margin-left: -1px;
  }
  &:after{
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    margin-top: -1px;
  }
}
.add_card{
  top: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
.clear{
  top: 4px;
  &:before,
  &:after{
    transform: rotate(45deg);
  }
}

@media (max-width: 1080px) {
  .board__colum{
    &:nth-child(n + 3) {
      order: 1;
    }
  }
}
</style>
