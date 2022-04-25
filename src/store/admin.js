import api from "../plugins/axios"

export default {
    namespaced: true,
    state: () => ({
        stats: []
    }),

    getters: {
        GET_STATS: state => state.stats
    },
    actions: {
        GET_STATS({ commit }) {
            return new Promise((resolve, reject) => {
                api.get('/dashboard')
                    .then(({ data }) => {
                        resolve(data)
                        commit('SET_STATS', data)
                    }).catch((error) => reject(error))
            })
        }
    },
    mutations: {
        SET_STATS: (state, data) => {
            state.stats = data
        }
    }
}