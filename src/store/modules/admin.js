import Api from "../../config/Api";
import { handlePromise } from "../../plugins/promisehandler";
import { serialize } from "../../plugins/serialise";

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
  getUserInitials: (state) => {
    const fullName = state.userData.first_name + " " + state.userData.last_name;
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("");
  },
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
  async login({ commit, state, dispatch }, { email, password }) {
    // const url = `/admin/login`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(
      Api.post(serializeUrl, { email, password })
    );

    let userData;

    if (response.status === 200) {
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

  async logout({ commit }) {
    const url = `/user/logout`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(Api.get(serializeUrl));
    if (response.success === 1) {
      localStorage.removeItem("token");
      commit("resetState");
    }
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
