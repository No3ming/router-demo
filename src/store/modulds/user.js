const user = {
  state: {
    addRoutes: []
  },
  mutations: {
    SET_ADDROUTES (state, routes) {
      state.addRoutes = routes
    }
  },
  actions: {
    setAddRoutes ({ commit, state }, routes) {
      commit('SET_ADDROUTES', routes)
    }
  }
}

export default user
