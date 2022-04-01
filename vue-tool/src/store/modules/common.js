import { requestLogin, requestLogout } from "@/api/auth";
import Router from "@/router";
const getInfos = (type) => {
  let info = null;
  try {
    info = JSON.parse(window.localStorage.getItem(type));
  } catch (e) {}
  return info;
};
const state = {
  collapseFlag: false,
  selectRoute: {},
  rules: getInfos('rules') || [],
  token: getInfos("token") || "",
  user: getInfos('user') || '',
  userInfo: getInfos('userInfo') || ''
};

const mutations = {
  TOGGLE_COLLAPSE(state, payload) {
    state.collapseFlag = payload;
  },
  SAVE_SELECT_ROUTE(state, payload) {
    state.selectRoute = {
      ...payload,
    };
  },
  SET_USER_INFOS(state, payload = {}) {
    window.localStorage.setItem('rules', JSON.stringify(payload.authAndUser.permissionIds) || '')
    window.localStorage.setItem("token", JSON.stringify(payload.token) || "");
    window.localStorage.setItem('user', JSON.stringify(payload.authAndUser) || '')
    window.localStorage.setItem('userInfo', JSON.stringify(payload.infoAndUser) || '')
    state.rules = payload.authAndUser.permissionIds instanceof Array ? payload.authAndUser.permissionIds : []
    state.token = payload.token
    state.user = payload.authAndUser instanceof Object ? payload.authAndUser : {}
    state.userInfo = payload.infoAndUser instanceof Object ? payload.infoAndUser : {}
  },
  CLEAR_USER_INFOS(state) {
    window.localStorage.removeItem('rules')
    window.localStorage.removeItem("token");
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('userInfo')
    state.rules = []
    state.token = ''
    state.user = null
    state.userInfo = null
  },
};

const getters = {};

const actions = {
  toggleCollapseFlag({ state, commit }, payload) {
    commit("TOGGLE_COLLAPSE", !state.collapseFlag);
  },
  saveClickRoute({ state, commit }, payload) {
    commit("SAVE_SELECT_ROUTE", payload);
  },
  async logined({ state, commit }, payload) {
    try {
      const res = await requestLogin(payload);
      commit('SET_USER_INFOS', res)

    } catch (e) {
      throw new Error(e);
    }
  },
  async logout({ state, commit }, payload) {
    try {
      await requestLogout(payload);
      commit("CLEAR_USER_INFOS");
      return Promise.resolve();
    } catch (e) {
      throw new Error(e);
    }
  },
  clearInfos({ state, commit }, payload) {
    try {
      commit("CLEAR_USER_INFOS");
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
