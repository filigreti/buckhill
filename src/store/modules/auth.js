import Api from "../../config/Api";
import { handlePromise } from "../../plugins/promisehandler";
import { serialize } from "../../plugins/serialise";

const getDefaultState = () => {
  return {
    loading: false,
  };
};

const state = getDefaultState();

const getters = {};

const mutations = {
  updateState(state, { type, data }) {
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

    if (response) {
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
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
