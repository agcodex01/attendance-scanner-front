import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import auth from './auth'
import attendance from './attendance'
import log from './log'
import admin from './admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    auth,
    attendance,
    log,
    admin
  }
})
