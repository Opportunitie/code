const state = {
  whid: "",  
  isLocation: true, // 是否有储位
};

const getters = {};

const mutations = {
  changeWhid(state, payload) {
    state.whid = payload;
  },
  changeLocationFlag(state, payload) {
    state.isLocation = payload;
  },
};

const actions = {
  hanleChangeWhid({ commit }, payload) {
    commit("changeWhid", payload);
  },
  hanleChangeLocationFlag({ commit }, payload) {
    commit("changeLocationFlag", payload);
  },
};

export default {
  state,
  mutations,
  getters,
  actions
}
