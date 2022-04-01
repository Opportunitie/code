const state = {
    selectId: [],
    row: {},
    top: '0px',
    index: -1,
    selectIds: []
}

const mutations = {
    'SET_TOP' (state, payload) {
        state.top = payload
    },
    'SET_INDEX' (state, payload) {
        state.index = payload
    },
    'SET_ROW' (state, payload) {
        state.row = payload
    },
    'SET_ID' (state, payload) {
        if (state.selectId.includes(payload)) {
            state.selectId = []
            state.index = -1
        } else {
            state.selectId = [payload]
        }
    },
    'CLEAR_ALL' (state, payload) {
        state.selectId = []
        state.top = '0px'
        state.row = {}
    },
    'SET_EXPANDS' (state, payload) {
        let has = false;
        let hIndex = -1;
        state.selectIds.map((item, index) => {
            if (item.id == payload.id) {
                has = true
                hIndex = index
            }
        })
        console.log(has)
        if (has && hIndex > -1) {
            state.selectIds.splice(hIndex, 1)
        } else {
            state.selectIds.push(payload)
        }
    }
}

const getters = {

}

const actions = {
    setExpand ({ state, commit }, payload = {}) {
        if (JSON.stringify(payload) != "{}") {
            commit('SET_TOP', payload.top)
            commit('SET_ID', payload.id)
            commit('SET_INDEX', payload.index)
            commit('SET_ROW', payload.row)
        }
    },
    clearExpand ({ state, commit }, payload = {}) {
        commit('CLEAR_ALL')
    },
    setExpands ({ state, commit }, payload = {}) {
        if (JSON.stringify(payload) != "{}") {
            commit('SET_EXPANDS', payload)
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}