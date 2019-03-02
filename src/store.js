import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 100,
    newCard: {},
    listAll: [],
    onHoldList: [],
    inProgressList: [],
    needsReviewList: [],
    approvedList: [],
    dragging: -1,
  },
  plugins: [createPersistedState()],
  getters: {
    getList(state) {
      return state.list;
    },
    getListOnHold(state) {
      return state.onHoldList;
    },
    getListInProgress(state) {
      return state.inProgressList;
    },
    getListNeedsReview(state) {
      return state.needsReviewList;
    },
    getListApproved(state) {
      return state.approvedList;
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
    setLIst(state, { list, variable }) {
      state[variable] = list;
    },
    addCardToList(state, { card, variable }) {
      state[variable].push(card);
    },
    setNewCard(state, { title, type }) {
      state.newCard.title = title;
      state.newCard.type = type;
    },
    clearNewCard(state) {
      state.newCard = {};
    },
    updateCard(state, value) {
      const variableFrom = `${value.card.type}List`
      const variableTo = `${value.type}List`
      const card = state[variableFrom].find(item => item.id === value.card.id);
      if (card) {
        state[variableFrom].splice(state[variableFrom].indexOf(card), 1)
        card.type = value.type
        state[variableTo].push(card);
      }
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
      const str = type //.split('_').map(item => ucFirst(item)).join('');
      const variable= `${str}List`;
      commit('addCardToList', { card, variable });
    },
    deleteCard({ state, commit }, card) {
      const variable = `${card.type}List`
      const newList = state[variable].slice();
      newList.splice(newList.indexOf(card), 1);
      commit('setLIst', { list: newList, variable });
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
