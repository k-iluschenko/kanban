import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 100,
    newCard: {},
    listAll: [],
    onHoldList: [{
      id: 10,
      title: 'onHoldList test',
    },
    {
      id: 11,
      title: 'onHoldList test',
    },
    ],
    inProgressList: [
      {
        id: 20,
        title: 'inProgress test',
      },
      {
        id: 21,
        title: 'inProgress test',
      },
    ],
    needsReviewList: [],
    approvedList: [],
  },
  plugins: [createPersistedState()],
  getters: {
    getList(state) {
      return state.listAll;
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
  },
  mutations: {
    setCount(state) {
      state.count = ++state.count;
    },
    setLIst(state, { list, variable }) {
      state[variable] = list;
    },
    addCardToList(state, { card, variable }) {
      state[variable].push(card);
    },
    setNewCard(state, { title }) {
      state.newCard.title = title;
    },
    clearNewCard(state) {
      state.newCard = {};
    },
  },
  actions: {
    addCard({ commit }, { card, type }) {
      commit('setCount');
      const Newcard = {
        id: this.state.count,
        title: card.title,
      };
      const variable = `${type}List`;
      commit('addCardToList', { card: Newcard, variable });
    },
    deleteCard({ state, commit }, { card, type }) {
      const variable = `${type}List`;
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
