import Api from "../../config/Api";
import { handlePromise } from "../../plugins/promisehandler";
import { serialize } from "../../plugins/serialise";

const getDefaultState = () => {
  return {
    customers: {},
    globalFilters: {
      page: 1,
      limit: 10,
      desc: false,
    },
  };
};

const state = getDefaultState();

const getters = {
  getCustomers: (state) => state.customers,
};

const mutations = {
  updateAuthState(state, { type, data }) {
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

const actions = {
  async getCustomerlists({ commit, state }) {
    const url = `/admin/user-listing`;
    const serializeUrl = serialize({
      url,
      filters: state.globalFilters,
    });
    const [response, error] = await handlePromise(Api.get(serializeUrl, true));
    commit("updateAuthState", {
      type: "customers",
      data: response,
    });
    console.log(response, "treses");

    return response || error;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
