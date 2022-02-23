<template>
  <div :key="$route.params.category" class="black--text">
    <v-container v-if="loading" fluid>
      <v-row class="d-flex flex-column justify-center align-center">
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_akv92uip.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></lottie-player>
      </v-row>
    </v-container>
    <v-col class="offset">
      <category-filter />
    </v-col>
    <v-container v-if="products.length">
      <v-row class="d-flex mx-auto justify-center align-center">
        <v-col cols="12" lg="10" xl="7">
          <div class="px-12">
            <div class="px-5">
              <h1 class="primary--text font-weight-light format-text">
                {{ products[0].category.title }}
              </h1>
              <div class="d-flex justify-space-between align-center">
                <v-breadcrumbs
                  class="mt-5"
                  :items="items"
                  divider="/"
                ></v-breadcrumbs>

                <div>
                  <v-select
                    v-model="params.desc"
                    :items="sort"
                    item-value="value"
                    item-text="type"
                    label="Sort By"
                    class="size"
                  ></v-select>
                </div>
              </div>
            </div>
            <v-row class="mt-4">
              <v-col
                lg="4"
                xl="4"
                md="4"
                v-for="(product, index) in products"
                :key="index"
              >
                <div class="d-flex mx-auto justify-center align-center w-100">
                  <products class="mb-4" :product="product" :addToCart="true" />
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div v-else-if="!loading && products.length === 0">
      <div class="d-flex justify-center align-center flex-column">
        <lottie-player
          src="https://assets1.lottiefiles.com/packages/lf20_jvclyiwj.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px"
          loop
          autoplay
        ></lottie-player>
        <div class="black--text unavailable">No Item</div>
      </div>
    </div>
  </div>
</template>

<script>
import Products from "../../components/Products.vue";
import CategoryFilter from "../../components/CategoryFilter.vue";

export default {
  components: {
    Products,
    CategoryFilter,
  },
  data() {
    return {
      loading: false,
      key: 1,
      params: {
        category: "",
        sortBy: "price",
        price: "",
        desc: true,
      },
      products: [],
      sort: [
        { type: "Highest price first", value: true },
        { type: "Lowest price first", value: false },
      ],
      sortValue: "Lowest price first",
      items: [
        {
          text: "Homepage",
          disabled: true,
          href: "#/products",
          exact: true,
        },
        {
          text: "Dogs",
          disabled: true,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Dog Food",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
        {
          disabled: false,
        },
      ],
    };
  },
  watch: {
    params: {
      deep: true,
      handler(value) {
        if (value) {
          this.getProducts();
        }
      },
    },
    async $route(val) {
      if (val) {
        this.params.category = this.$route.params.id;
        await this.getProducts();
      }
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async getProducts() {
      this.products = [];
      this.loading = true;
      const response = await this.$store.dispatch(
        "global/getProductsByCategory",
        { params: this.params }
      );
      this.loading = false;
      if (response && response.length) {
        this.products = response;
        this.items[3].text = this.capitalizeFirstLetter(
          this.products[0].category.title
        );
      }
      this.$forceUpdate();
      this.key += 1;
      return response;
    },
  },
  async mounted() {
    this.params.category = this.$route.params.id;
    await this.getProducts();
  },
};
</script>

<style>
.w-100 {
  width: 100% !important;
  /* display: inline-flex !important;h */
}
.offset {
  position: fixed !important;
  left: 5rem;
  width: 17rem;
  height: 40vh;
  overflow: auto;
  top: 21rem;
}

@media (min-width: 1904px) {
  .offset {
    left: 12rem;
    height: 60vh;
  }
}

.v-breadcrumbs {
  padding: 0 !important;
}
.theme--light.v-breadcrumbs .v-breadcrumbs__divider,
.theme--light.v-breadcrumbs .v-breadcrumbs__item--disabled {
  color: rgba(0, 0, 0, 0.38) !important;
}
.v-breadcrumbs__item {
  color: black !important;
  font-size: 0.8rem;
}
.v-select__selection--comma {
  font-size: 0.8rem !important;
}
.size {
  width: 10rem;
}
</style>
