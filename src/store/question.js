import * as Api from "@/api/question"
import { tagsCache } from "@/utils/cache"

const state = {
  payload: { page: 1, tag: "", text: "" },
  tags: tagsCache.get() || [],
  list: [],
  total: 0,
  statistics: {
    collectTotal: 0,
    historyTotal: 0
  }
}

const mutations = {
  SET_QUESTION(state, payload = {}) {
    Object.assign(state, payload)
  }
}

const actions = {
  async fetchQuestion({ commit }, payload = { page: 1 }) {
    const { list = [], total = 0 } = await Api.list(payload)
    commit("SET_QUESTION", { payload, list, total })
  },
  async fetchMoreQuestion({ commit, state }) {
    const { total, list, payload = {} } = state
    if (total <= list.length) return
    payload.page = (payload.page || 1) + 1
    const { list: data = [] } = await Api.list(payload)
    commit("SET_QUESTION", { list: [...list, ...data] })
  },
  async fetchTags({ commit }) {
    const tags = await Api.tags()
    tagsCache.set(tags)
    commit("SET_QUESTION", { tags })
  },
  async fetchStatistics({ commit }) {
    const {
      collectTotal = 0,
      historyTotal = 0
    } = await Api.statistics()
    commit('SET_QUESTION', { statistics: { collectTotal, historyTotal } })
  }
}

export default {
  state,
  mutations,
  actions
}
