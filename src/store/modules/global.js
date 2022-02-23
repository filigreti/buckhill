import Api from "../../config/Api";
import { handlePromise } from "../../plugins/promisehandler";
import { serialize } from "../../plugins/serialise";

const getDefaultState = () => {
  return {
    products: {},
    blogs: [],
    static: [],
    promotions: [],
    categories: {},
    globalFilters: {
      page: 1,
      limit: 10,
      desc: false,
    },
    loading: false,
    productDetail: {},
  };
};

const state = getDefaultState();

const getters = {
  getProducts: (state) => state.products,
  getBlogs: (state) =>
    state.blogs.sort((a, b) =>
      (a.image || "zzz").localeCompare(b.image || "zzz")
    ),
  getPromotions: (state) => {
    return state.promotions.filter((item) => {
      const startDate = new Date(item.valid_from);
      const endDate = new Date(item.valid_to);
      const date = new Date();
      return date >= startDate && date <= endDate;
    });
  },
  getLoading: (state) => state.loading,
  getCategories: (state) => state.categories,
  getStatic: (state) => state.static,
  getProductDetails: (state) => state.productDetail,
};

const mutations = {
  updateState(state, { type, data }) {
    const keys = Object.keys(state);
    for (let i = 0; i < keys.length; i++) {
      state[keys[i]] = keys[i] === type ? data : state[keys[i]];
    }
    return state;
  },
  setDefault(state) {
    getDefaultState();
  },
  setLoading(state, payload) {
    if (Object.keys(state.products).length || Object.keys(state.blogs).length) {
      state.loading = false;
      return;
    }
    state.loading = payload;
  },
};

const actions = {
  async getProducts({ commit, state }, payload) {
    commit("setLoading", true);
    const url = `/products`;
    const serializeUrl = serialize({
      url,
      filters: state.globalFilters,
    });
    const [response, error] = await handlePromise(
      Api.get(serializeUrl, payload)
    );

    if (response) {
      commit("updateState", {
        type: "products",
        data: response,
        //infinite scrolling logic
        // data: {
        //   ...response,
        //   data: Object.keys(state.products).length
        //     ? [...state.products.data, ...response.data]
        //     : [...response.data],
        // },
      });
    }
    commit("setLoading", false);
    return response || error;
  },

  async getProductsByCategory({ commit, dispatch, state }, payload) {
    commit("setLoading", true);
    const url = `/products`;
    const serializeUrl = serialize({
      url,
      filters: state.globalFilters,
      body: payload.params || {},
    });
    const [response, error] = await handlePromise(
      Api.get(serializeUrl, payload)
    );
    commit("setLoading", false);
    let formatedResponse = await Promise.all(
      response.data.map(async (items) => {
        return {
          ...items,
          image: await dispatch("urlToBase64", { id: items.metadata.image }),
        };
      })
    );

    return formatedResponse || error;
  },

  async getBlogs({ commit, state, dispatch }) {
    commit("setLoading", true);
    const url = `/main/blog`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(Api.get(serializeUrl));

    if (response) {
      const formatedResponse = await Promise.all(
        response.data.map(async (items) => {
          return {
            ...items,
            image: await dispatch("urlToBase64", { id: items.metadata.image }),
          };
        })
      );

      commit("updateState", {
        type: "blogs",
        data: formatedResponse,
      });
    }
    commit("setLoading", false);
    return response || error;
  },

  async getPromotions({ commit, dispatch }) {
    commit("setLoading", true);
    const url = `/main/promotions`;
    const serializeUrl = serialize({ url });
    const [response, error] = await handlePromise(Api.get(serializeUrl));
    if (response) {
      const formatData = await Promise.all(
        response.data.map(async (items) => {
          return {
            image: await dispatch("urlToBase64", { id: items.metadata.image }),
            valid_from: items.metadata.valid_from,
            valid_to: items.metadata.valid_to,
            title: items.title,
            content: items.content,
          };
        })
      );

      commit("updateState", {
        type: "promotions",
        data: formatData,
      });
    }
    commit("setLoading", false);
    return response || error;
  },

  async getCategories({ commit, dispatch }) {
    commit("setLoading", true);
    const url = `/categories`;
    const serializeUrl = serialize({ url, filters: state.globalFilters });
    const [response, error] = await handlePromise(Api.get(serializeUrl));
    if (response && response.data && response.data.length) {
      const formatData = await Promise.all(
        response.data.map(async (items) => {
          return {
            ...items,
            products: await dispatch("getProductsByCategory", {
              params: { category: items.uuid },
            }),
          };
        })
      );
      commit("updateState", {
        type: "categories",
        data: {
          ...response,
          data: formatData,
        },
      });
    }

    commit("setLoading", false);
    return response || error;
  },

  async urlToBase64(_, { id }) {
    const [response, error] = await handlePromise(Api.blob(`/file/${id}`));
    if (response.data) {
      return URL.createObjectURL(response.data);
    } else {
      return "";
    }
  },

  async getFiles({ dispatch }, { id }) {
    const url = `file/${id}`;
    const [response, error] = await handlePromise(Api.get(url));
    return response || error;
  },

  async getSpecificData({ commit, dispatch, state }, payload) {
    commit("setLoading", true);
    const url = `/products`;
    const serializeUrl = serialize({
      url,
      filters: state.globalFilters,
      body: payload.params || {},
    });
    const [response, error] = await handlePromise(
      Api.get(serializeUrl, payload)
    );
    commit("setLoading", false);
    let formatedResponse = await Promise.all(
      response.data.map(async (items) => {
        return {
          ...items,
          image: await dispatch("urlToBase64", { id: items.metadata.image }),
        };
      })
    );

    return { ...response, ...formatedResponse } || error;
  },

  async getAllCategoriesAndBrands({ commit, dispatch }) {
    const urlOne = `/categories`;
    const urlTwo = `/brands`;

    const catUrl = serialize({ url: urlOne, body: { limit: 100 } });
    const brandUrl = serialize({ url: urlTwo, body: { limit: 100 } });
    const [firstResponse, secondResponse] = await Promise.all([
      Api.get(catUrl),
      Api.get(brandUrl),
    ]);
    const formatFirstResponse = await Promise.all(
      firstResponse.data.map(async (items) => {
        return {
          ...items,
          products: await dispatch("getSpecificData", {
            params: { category: items.uuid },
          }),
        };
      })
    );
    const formatSecondResponse = await Promise.all(
      secondResponse.data.map(async (items) => {
        return {
          ...items,
          products: await dispatch("getSpecificData", {
            params: { brand: items.uuid },
          }),
        };
      })
    );
    commit("updateState", {
      type: "static",
      data: [formatFirstResponse, formatSecondResponse],
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
