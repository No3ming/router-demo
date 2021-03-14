import Vue from 'vue'
import Vuex from 'vuex'
import user from './modulds/user'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user
  },
  getters: {
    addRoutes: state => state.user.addRoutes
  }
})
