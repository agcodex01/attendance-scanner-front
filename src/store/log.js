import LogService from "../services/log"

export default {
    namespaced: true,
    state: () => ({
        logs: []
    }),
    getters: {
        GET_LOGS: state => state.logs
    },
    actions: {
        GET_LOGS ({ commit }, filter) {
            return new Promise((resolve, reject) => {
                LogService.fetchAll(filter).then(({ data}) => {
                    commit('SET_LOGS', data)
                    resolve(data)
                }).catch(error => reject(error.response.data))
            })
        }
    },
    mutations: {
        SET_LOGS: (state, data) => {
            state.logs = data
        }
    }
}