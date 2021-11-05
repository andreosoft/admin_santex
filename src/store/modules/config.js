import axios from '../../libs/axios';

const state = {
  data: {},
}

const getters = {
  get: state => state.data
}

const actions = {
  fitch: async ({ commit, dispatch }) => {
    const resp = await axios.get('/config');
    commit('set', resp.data);
  }
}

const mutations = {
  set: (state, resp) => {
    state.data = resp
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
