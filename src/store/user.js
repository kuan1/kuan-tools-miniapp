import authority from "@/utils/authority"

const state = {
  user: authority.get() || {}
}

const mutations = {
  SET_USER(state, payload = {}) {
    Object.assign(state, payload)
  }
}

const actions = {
  setUser({ commit }, user) {
    commit("SET_USER", { user: authority.set(user) })
  },
  clearUser({ commit }) {
    authority.clear()
    commit("SET_USER", { user: {} })
  }
}

export default {
  namespace: false,
  state,
  mutations,
  actions
}
