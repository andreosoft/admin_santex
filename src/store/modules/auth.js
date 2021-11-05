import axios from '../../libs/axios';
import router from '../../libs/router';

const state = {
  token: localStorage.getItem('user-token') || '',
  profile: null,
  status: '',
  error: '',
}

const getters = {
  isAuthenticated: state => !!state.token,
  profile: state => {
    let profile = state.profile;
    if (!profile) {
      try { profile = JSON.parse(localStorage.getItem('user-profile')); }
      catch { }
      if (!profile) {
        profile = { role: 0 };
        localStorage.setItem('user-profile', JSON.stringify(profile))
      }
      state.profile = profile;
    }
    return profile;
  },
  role: state => {
    return parseInt(getters.profile(state).role) ? parseInt(getters.profile(state).role) : 0;
  },
  status: state => state.status,
  error: state => state.error,
}

const actions = {
  async updateProfile({ commit, dispatch }) {
    const resp = await axios.get('/signup/get_profile');
    commit('updateProfile', resp.data.data);
  },
  async login({ commit, dispatch }, data) {
    try {
      const resp = await axios.post('/signup/login', data);
      commit('authSuccess', resp.data.token);
      commit('updateProfile', resp.data.profile);
    } catch (error) {
      commit('authError', error.response.data.message);
    }
  },
  logout({ commit, dispatch }) {
    commit('authLogout');
  }
}

const mutations = {
  authLoading: (state) => {
    state.status = 'loading'
  },
  authSuccess: (state, token) => {
    state.status = 'success';
    state.token = token;
    localStorage.setItem('user-token', token);
    axios.defaults.headers.common['Authorization'] = token;
  },
  authError: (state, error) => {
    state.status = 'error'
    state.error = error
    localStorage.removeItem('user-token')
  },
  authLogout: (state) => {
    state.token = '';
    state.profile = null;
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-profile');
    axios.defaults.headers.common['Authorization'] = "";
  },
  updateProfile: (state, data) => {
    state.profile = data;
    localStorage.setItem('user-profile', JSON.stringify(data))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
