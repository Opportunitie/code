const state = {
    myCommodityList: []
}

const mutations = {
    'SAVE_TABLE'(state, payload) {
        state.myCommodityList = [...payload]
        console.log("传递过来的集合是vuex: ：", payload);
    },

}
const getters = {}

const actions = {
    setCommodityList({ state, commit }, payload) {
        commit('SAVE_TABLE', payload)
    },

}

export default {
    state,
    mutations,
    getters,
    actions
}