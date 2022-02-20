import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";
import auth from "./modules/auth";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ["global.static"],
    }),
  ],
});
