import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";
import auth from "./modules/auth";
import cart from "./modules/cart";
import admin from "./modules/admin";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    auth,
    cart,
    admin,
  },
  plugins: [
    createPersistedState({
      paths: [
        "global.static",
        "auth.isSignedOn",
        "auth.userData",
        "global.productDetail",
        "cart.cart",
      ],
    }),
  ],
});
