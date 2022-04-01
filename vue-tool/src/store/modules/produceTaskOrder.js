const state = {
  // 待生产单据
  willProduceOrder: [],
  // 已完成单据
  completedOrder: [],
  // 待确认单据数量
  noConfirmed: 0
}

const getters = {}

const mutations = {
  SAVE_WILL_PRODUCE_ORDER(state, payload) {
    state.willProduceOrder = state.willProduceOrder.concat(payload)
  },
  SAVE_COMPLETED_ORDER(state, payload) {
    state.completedOrder = state.completedOrder.concat(payload)
  },
  SET_NO_CONFIRMED(state, payload) {
    state.noConfirmed = payload
  }
}

const actions = {
  saveWillProduceOrder({ state, commit }, payload) {
    if (!payload) return
    commit('SAVE_WILL_PRODUCE_ORDER', payload)
  },
  saveCompletedOrder({ state, commit }, payload) {
    if (!payload) return
    commit('SAVE_COMPLETED_ORDER', payload)
  },
  setNoConfirmed({ state, commit }, payload) {
    if (!payload) return
    commit('SET_NO_CONFIRMED', payload)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
