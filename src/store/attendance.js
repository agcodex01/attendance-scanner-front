import AttendanceService from "../services/attendance";

export default {
  namespaced: true,
  state: () => ({
    attendances: [],
    signin: null,
    all: [],
    currentDepartment: localStorage.getItem("currentDepartment"),
    attendanceFetching: false
  }),
  getters: {
    GET_ATTENDANCES: (state) => state.attendances,
    GET_ALL: (state) => state.all,
    GET_CURRENT_DEPARTMENT: (state) => state.currentDepartment,
    GET_ATTENDANCES_FETCHING: state => state.attendanceFetching
  },
  actions: {
    GET_ATTENDANCES({ commit }, filter) {
      return new Promise((resolve, reject) => {
        commit('SET_FETCHING', true)
        AttendanceService.getAttendances(filter)
          .then(({ data }) => {
            commit("SET_ATTENDANCES", data);
            resolve(data);
          })
          .catch((error) => reject(error.response.errors))
          .finally(() => commit('SET_FETCHING', false));
      });
    },
    GET_ALL({ commit }, filter) {
      return new Promise((resolve, reject) => {
        commit('SET_FETCHING', true)
        AttendanceService.all(filter)
          .then(({ data }) => {
            console.log("ALL", data);
            commit("SET_ALL", data);
            resolve(data);
          })
          .catch((error) => reject(error.response.errors))
          .finally(() => commit('SET_FETCHING', false));
      });
    },
    SIGN({ commit }, userId) {
      return new Promise((resolve, reject) => {
        AttendanceService.sign(userId)
          .then((data) => {
            commit("SET_SIGN_IN", data);
            resolve(data);
          })
          .catch((error) => reject(error.response));
      });
    },
    UPDATE_LOCATION(context, { id, location }) {
      return new Promise((resolve, reject) => {
        AttendanceService.updateLocation(id, location)
         .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => reject(error.response));
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
    SET_FETCHING: (state, status) => {
      state.attendanceFetching = status
    }
  },
};
