import Vue from "vue";
import Vuex from "vuex";
import global from "./modules/global";
import auth from "./modules/auth";
import cart from "./modules/cart";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    auth,
    cart,
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
