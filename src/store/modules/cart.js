import Api from "../../config/Api";
import { handlePromise } from "../../plugins/promisehandler";
import { serialize } from "../../plugins/serialise";

const getDefaultState = () => {
  return {
    cart: {},
  };
};

const state = getDefaultState();

const getters = {
  getCart: (state) => state.cart,
};

const mutations = {
  updateState(state, { type, data }) {
    const keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      state[keys[i]] = keys[i] === type ? data : state[keys[i]];
    }
    return state;
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
