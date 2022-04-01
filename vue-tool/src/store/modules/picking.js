const state = {
    order: {}
}

const mutations = {
    'SAVE_ORDER' (state, payload) {
        state.order = payload
    },
    'CLEAR_ORDER' (state, payload) {
        state.order = {}
    }
}

const getters = {

}

const actions = {
    saveOrder ({ state, commit }, payload = {}) {
        if (JSON.stringify(payload) != "{}") {
            commit('SAVE_ORDER', payload)
        }
    },
    clearOrder ({ state, commit }, payload = {}) {
        commit('CLEAR_ORDER')
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}