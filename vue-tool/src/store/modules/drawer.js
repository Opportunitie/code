import { getLabelListApi, fetchSplitData } from '@/api/api'
const state = {
    drawerInfos: {},
    showDrawerDelete: false,
    top: 0,
    left: 0,
    deleteRow: {},
    highlight1: [],
    highlight2: [],
    labellist: []
}

const mutations = {
    'SAVE_DRAWER_INFOS'(state, payload) {
        console.log(payload, 'pay--')
        state.drawerInfos = payload
    },
    'CLEAR_DRAWER_INFOS'(state, payload) {
        state.showDrawerDelete = false
        state.deleteRow = {}
        state.top = 0
        state.left = 0
        state.highlight2 = []
    },
    'CLEAR_DRAWER_Lable_List'(state, payload) {
        state.labellist = []
    },
    'SHOW_DRAWER_DELETE'(state, payload) {
        const { top = 0, left = 0, row = {}, show = false } = payload
        state.showDrawerDelete = show
        state.deleteRow = row
        state.top = top
        state.left = left
    },
    'SET_HIGH_LIGHT1'(state, payload) {
        state.highlight1 = [...payload]
    },
    'SET_HIGH_LIGHT2'(state, payload) {
        state.highlight2 = [...payload]
    },
    'SAVE_LABEL_LIST'(state, payload) {
        state.labellist = payload instanceof Array ? payload : []
    }
}

const getters = {

}

const actions = {
    saveDrawerInfos({ state, commit }, payload) {
        commit('SAVE_DRAWER_INFOS', payload)
    },
    clearDrawerInfos({ state, commit }, payload) {
        commit('CLEAR_DRAWER_INFOS')
    },
    showDrawerDelete({ state, commit }, payload) {
        commit('SHOW_DRAWER_DELETE', payload)
    },
    setHighlight1({ state, commit }, payload) {
        commit('SET_HIGH_LIGHT1', payload)
    },
    setHighlight2({ state, commit }, payload) {
        commit('SET_HIGH_LIGHT2', payload)
    },
    async getLabelList({ state, commit }, payload) {
        try {
            const res = await getLabelListApi(payload)
            commit('SAVE_LABEL_LIST', res)
        } catch (e) { }
    },
    // 工单分料
    async getLabelDataList({ state, commit }, payload) {
        try {
            const res = await fetchSplitData(payload)
            commit('SAVE_LABEL_LIST', res)
        } catch (e) { }
    },
     // 清空lableList
    async clearDrawerLableList({ state, commit }, payload) {
        commit('CLEAR_DRAWER_Lable_List',payload)
    },
}

export default {
    state,
    mutations,
    getters,
    actions
}