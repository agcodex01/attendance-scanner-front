import AttendanceService from "../services/attendance";

export default {
  namespaced: true,
  state: () => ({
    attendances: [],
    signin: null,
    all: [],
    currentDepartment: localStorage.getItem("currentDepartment"),
  }),
  getters: {
    GET_ATTENDANCES: (state) => state.attendances,
    GET_ALL: (state) => state.all,
    GET_CURRENT_DEPARTMENT: (state) => state.currentDepartment,
  },
  actions: {
    GET_ATTENDANCES({ commit }, filter) {
      return new Promise((resolve, reject) => {
        AttendanceService.getAttendances(filter)
          .then(({ data }) => {
            commit("SET_ATTENDANCES", data);
            resolve(data);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    GET_ALL({ commit }, filter) {
      return new Promise((resolve, reject) => {
        AttendanceService.all(filter)
          .then(({ data }) => {
            console.log("ALL", data);
            commit("SET_ALL", data);
            resolve(data);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    SIGN({ commit, dispatch }, userId) {
      return new Promise((resolve, reject) => {
        AttendanceService.sign(userId)
          .then((data) => {
            dispatch('GET_ATTENDANCES')
            commit("SET_SIGN_IN", data);
            resolve(data);
          })
          .catch((error) => reject(error.response.data));
      });
    },
    UPDATE_LOCATION({ dispatch }, { id, location }) {
      return new Promise((resolve, reject) => {
        AttendanceService.updateLocation(id, location)
         .then(({ data }) => {
           console.log(data);
            dispatch('GET_ATTENDANCES')
            resolve(data);
          })
          .catch((error) => reject(error.response.errors));
      });
    },
    SET_DEPARTMENT({ commit }, data) {
      commit("SET_CURRENT_DEPARTMENT", data);
    },
  },
  mutations: {
    SET_ATTENDANCES: (state, data) => {
      state.attendances = data;
    },
    SET_SIGN_IN: (state, data) => {
      state.signin = data;
    },
    SET_ALL: (state, data) => {
      state.all = data;
    },
    UPDATE_ATTENDANCE: (state, { data, id }) => {
      const index = state.attendances.findIndex((user) => user.id == id);
      state.attendances.splice(index, 1, data);
    },
    SET_CURRENT_DEPARTMENT: (state, department) => {
      state.currentDepartment = department;
      localStorage.setItem("currentDepartment", department);
    },
  },
};
