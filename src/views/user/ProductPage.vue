<template>
  <v-container>
    <v-row class="d-flex mx-auto justify-center align-center black--text">
      <v-col cols="12" lg="10" xl="7">
        <v-breadcrumbs class="" :items="items" divider="/"></v-breadcrumbs>
        <div class="d-flex justify-space-around align-center page-cont">
          <img
            class="product-page-image ml-10"
            :src="getProductDetails.image"
          />
          <div class="text-cont ml-10">
            <h1 class="black--text font-weight-light format-text">
              {{ getProductDetails.title }}
            </h1>
            <h1 class="black--text font-weight-light format-text mt-3">
              {{ getProductDetails.price }} kn
            </h1>
            <div class="d-flex align-center mt-5">
              <v-btn @click="addToCart" class="primary mr-3" large>
                <v-icon dark left> mdi-cart </v-icon>ADD TO CART
              </v-btn>

              <div class="ml-4">
                <v-btn
                  height="47"
                  color="grey--text"
                  min-width="45"
                  :disabled="number <= 1"
                  @click="number -= 1"
                  elevation="0"
                >
                  <svg
                    width="10"
                    height="3"
                    viewBox="0 0 14 3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2.08691H0V0.0869141H14V2.08691Z"
                      fill="black"
                      fill-opacity="0.34"
                    />
                  </svg>
                </v-btn>
                <v-btn
                  height="47"
                  color="grey"
                  class="mx-4"
                  min-width="45"
                  elevation="0"
                  outlined
                >
                  {{ number }}
                </v-btn>

                <v-btn
                  @click="number += 1"
                  height="47"
                  color="grey--text"
                  min-width="45"
                  elevation="0"
                >
                  <svg
                    width="10"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 8.08691H8V14.0869H6V8.08691H0V6.08691H6V0.0869141H8V6.08691H14V8.08691Z"
                      fill="black"
                      fill-opacity="0.34"
                    />
                  </svg>
                </v-btn>
                <!-- <svg
                  width="48"
                  height="48"
                  style="margin-top: -1px"
                  viewBox="0 0 48 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.0869141"
                    width="48"
                    height="48"
                    rx="4"
                    fill="#F4F6F5"
                  />
                  <path
                    d="M31 25.0869H17V23.0869H31V25.0869Z"
                    fill="black"
                    fill-opacity="0.26"
                  />
                </svg> -->
              </div>
            </div>
            <div class="small" v-if="getCart[getProductDetails.uuid]">
              *Product in cart
            </div>
          </div>
        </div>
        <div class="prod-desc">
          {{ getProductDetails.description }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      number: 1,

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
          href: "breadcrumbs_link_2",
        },
        {
          disabled: false,
        },
      ],
    };
  },
  watch: {
    // number() {
    //   this.addToCart();
    // },
  },
  computed: {
    ...mapGetters("global", ["getProductDetails"]),
    ...mapGetters("cart", ["getCart"]),
  },
  methods: {
    addToCart() {
      let { uuid, price, title, metadata } = this.getProductDetails;
      const payload = {
        [uuid]: { price, image: metadata.image, title, qty: this.number },
      };
      this.$store.commit("cart/updateState", {
        type: "cart",
        data: {
          ...this.getCart,
          ...payload,
        },
      });
    },
  },
  mounted() {
    if (Object.keys(this.getCart).length) {
      if (this.getCart[this.getProductDetails.uuid]) {
        this.number = this.getCart[this.getProductDetails.uuid].qty;
      }
    }
    this.items[3].text = this.getProductDetails.category.title;
    this.items[3].href = `#/category/${this.getProductDetails.category.slug}/${this.getProductDetails.category.uuid}`;
    this.items[4].text = this.$options.filters.truncate(
      this.getProductDetails.title,
      50
    );
  },
};
</script>

<style>
.product-page-image {
  width: 300px !important;
  height: 300px !important;
  object-fit: contain;
}
.format-text {
  font-size: 1.2rem;
}

@media (min-width: 1904px) {
  .product-page-image {
    width: 400px !important;
    height: 600px !important;
  }

  .text-cont h1 {
    font-size: 1.5rem !important;
  }
}
.text-cont {
  width: 25rem;
}
.text-cont h1 {
  font-size: 1rem;
}
.page-cont {
  margin-top: 6rem;
}
.prod-desc {
  margin-top: 5rem;
  font-size: 1.3rem;
  font-weight: 300;
}
.small {
  margin-top: 0.3rem;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
