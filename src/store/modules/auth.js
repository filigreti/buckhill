import Api from "../../config/Api";
import { handlePromise } from "../../plugins/promisehandler";
import { serialize } from "../../plugins/serialise";
import Vue from "vue";

const getDefaultState = () => {
  return {
    isSignedOn: false,
    userData: {},
  };
};

const state = getDefaultState();

const getters = {
  getSignedInStatus: (state) => state.isSignedOn,
  getUserData: (state) => state.userData,
};

const mutations = {
  updateAuthState(state, { type, data }) {
    const keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      state[keys[i]] = keys[i] === type ? data : state[keys[i]];
    }
    return state;
  },
};

const actions = {
  async login({ commit, state, dispatch }, { email, password }) {
    const url = `/user/login`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(
      Api.post(serializeUrl, { email, password })
    );

    let userData;

    if (response.status === 200) {
      console.log(response, "luuui");
      localStorage.setItem("token", response.data.data.token);
      userData = await dispatch("getUserData");
      response.data.data.userData = userData;
    }

    return response || error;
  },
  async register(
    { commit, state, dispatch },
    {
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      address,
      phone_number,
    }
  ) {
    const url = `/user/create`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(
      Api.post(serializeUrl, {
        first_name,
        last_name,
        email,
        password,
        password_confirmation,
        address,
        phone_number,
      })
    );

    return response || error;
  },

  async getUserData({ commit }) {
    const url = `/user`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(Api.get(serializeUrl, true));
    commit("updateAuthState", {
      type: "userData",
      data: response.data,
    });
    commit("updateAuthState", {
      type: "isSignedOn",
      data: true,
    });

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
