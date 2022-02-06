import AuthService from "../services/auth";

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
  }),
  getters: {
    GET_USER: (state) => {
      return state.user;
    },
    GET_TOKEN: (state) => {
      return state.token;
    },
  },
  actions: {
    async LOGIN({ commit }, credential) {
      return new Promise((resolve, reject) => {
        AuthService.login(credential)
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            resolve(data);
            commit("SET_TOKEN", data.token);
            commit("SET_USER", data.user);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    LOG_OUT({commit}) {
      return new Promise((resolve, reject) => {
        AuthService.logout().then(() => {
          resolve(true)
          commit('REMOVE_USER_INFO')
        }).catch(error => reject(error.response.data))
       
      })
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
    },
    SET_USER: (state, data) => {
      state.user = data;
    },
    REMOVE_USER_INFO: (state) => {
      state.user = null,
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
};
