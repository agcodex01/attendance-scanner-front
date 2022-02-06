import UserService from "../services/user";

export default {
  namespaced: true,
  state: () => ({
    users: [],
    user: null
  }),
  getters: {
    GET_USERS: (state) => state.users,
    GET_USER: state => state.user
  },
  actions: {
    async GET_USERS({ commit }) {
      return new Promise((resolve, reject) => {
        UserService.getUsers({})
          .then(({ data }) => {
            commit("SET_USERS", data);
            resolve(data);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    async CREATE_USER({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        UserService.create(userInfo)
          .then(({ data }) => {
            commit("ADD_USER", data.user);
            resolve(data.user);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    async UPDATE_USER({ commit }, { userInfo, id }) {
      return new Promise((resolve, reject) => {
        UserService.update(userInfo, id)
          .then(({ data }) => {
            commit("UPDATE_USER", data.user);
            resolve(data.user);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    async FIND_USER_BY_ID ({ commit }, id) {
        return new Promise((resolve, reject) => {
            UserService.findById(id).then(({ data }) => {
                commit('SET_USER', data)
                resolve(data)
            }).catch(error => reject(error.response.errors))
        })
    }
  },
  mutations: {
    SET_USERS: (state, data) => {
      state.users = data;
    },
    ADD_USER: (state, data) => {
      state.users.push(data);
    },
    UPDATE_USER: (state, { data, id }) => {
      const index = state.users.findIndex((user) => (user.id = id));
      state.users.splice(index, 1, data);
    },
    SET_USER: (state, data) => {
        state.user = data
    }
  },
};
