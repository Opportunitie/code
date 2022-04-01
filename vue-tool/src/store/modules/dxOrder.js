const state = {
    myDxCommodityList: []
}

const mutations = {
    'SAVE_TABLE'(state, payload) {
        state.myDxCommodityList = [...payload]
    },

}
const getters = {}

const actions = {
    setDxCommodityList({ state, commit }, payload) {
        commit('SAVE_TABLE', payload)
    },

}

export default {
    state,
    mutations,
    getters,
    actions
}