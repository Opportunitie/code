const state = {
    orderInfo: {}
}

const mutations = {
    'SAVE_INFO'(state, payload) {
        state.orderInfo = { ...payload }
    },
    'CLEAN_INFO'(state, payload) {
        state.orderInfo = {}
    }
}
const getters = {}

const actions = {
    async getInfoByPid({ state, commit }, payload) {
        try {
            await new Promise((res, rej) => {
                setTimeout(() => {
                    commit('SAVE_INFO', {
                        mno: '5101000498',
                        type: 'PO单收料',
                        desc: 'u4G-UE1100V,下盒体组件，氧化+喷粉，DBCS71011489',
                        num: 1500
                    })
                    res()
                }, 100);
            })
        } catch (e) {

        }
    },
    getOrderInfo({ state, commit }, payload) {
        commit('SAVE_INFO', payload)
    },
    cleanOrderInfo({ state, commit }, payload) {
        commit('CLEAN_INFO')
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}