const state = {
    selectId: '',
    selectBbid: '',
}

const mutations = {
    'STLECT_ITEM'(state, payload) {
        state.selectId = payload
    },
    'STLECT_ITEM_BBID'(state, payload) {
        state.selectBbid = payload
    },
    'CLEAR_SELECT_ITEM'(state) {
        state.selectId = ''
    }
}

const getters = {

}

const actions = {
    selectItem({ state, commit }, payload) {
        commit('STLECT_ITEM', payload)
    },
    selectItemBbid({ state, commit }, payload) {
        commit('STLECT_ITEM_BBID', payload)
    },
    clearSelectItem({ state, commit }) {
        commit('CLEAR_SELECT_ITEM')
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}