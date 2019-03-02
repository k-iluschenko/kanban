import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 100,
    newCard: {},
    list: [],
    dragging: -1,
  },
  plugins: [createPersistedState()],
  getters: {
    getList(state) {
      return state.list;
    },
    getNewCard(state) {
      return state.newCard;
    },
    getDragging(state) {
      return state.dragging;
    },

  },
  mutations: {
    setDragging(state, value) {
      state.dragging = value
    },
    setCount(state) {
      state.count = ++state.count;
    },
    setLIst(state, list) {
      state.list = list;
    },
    addCardToList(state, card) {
      state.list.push(card);
    },
    setNewCard(state, { title, type }) {
      state.newCard.title = title;
      state.newCard.type = type;
    },
    clearNewCard(state) {
      state.newCard = {};
    },
    updateCard(state, value) {
      const card = state.list.find(item => item.id === value.id);
      if (card) {
        card.type = value.type;
      }
      console.log(card);
      console.log(value);
    },
  },
  actions: {
    addCard({ commit }, { title, type }) {
      commit('setCount');
      const card = {
        id: this.state.count,
        title,
        type,
      };
      commit('addCardToList', card);
    },
    deleteCard({ state, commit }, card) {
      const newList = state.list.slice();
      newList.splice(newList.indexOf(card), 1);
      commit('setLIst', newList);
    },
  },
});

// Для каждой колонки свой массив??
// Один общий массив??
// let list = [
//   {
//     id: 1,
//     title: '',
//     type: '',
//   },
// ];
// Один массив из 4х элементов по типу колонки??
// let list = [
//   {
//     type: 'on_hold',
//     items: [{
//       id: 1,
//       title: '',
//     }],
//   },
//   {
//     type: 'in_progress',
//     items: [{
//       id: 2,
//       title: '',
//     }],
//   },
//   {
//     type: 'needs_review',
//     items: [{
//       id: 3,
//       title: '',
//     }],
//   },
//   {
//     type: 'approved',
//     items: [{
//       id: 4,
//       title: '',
//     }],
//   },
// ];
