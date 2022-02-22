<template>
  <main>
    <v-breadcrumbs
      color="black"
      class="pl-0 black--text cart-header mt-10"
      :items="items"
      divider="/"
    ></v-breadcrumbs>
    <div class="primary--text cart-header-text">Your Cart</div>
    <div v-if="Object.keys(getCart).length">
      <div class="mt-10" v-for="(cart, index) in getCart" :key="index">
        <div class="d-flex w-100 mb-5 align-center">
          <v-card :elevation="1" class="cart-card-area">
            <image-resolve :image="cart.image" />
          </v-card>
          <div class="cart-info ml-10">
            <div style="font-size: 0.95rem" class="mb-3">
              {{ cart.title | truncate(60, "..") }}
            </div>
            <div>{{ cart.price }} kn</div>
            <div>
              <div class="d-flex align-center mt-3">
                <button
                  height="30"
                  color="grey--text"
                  class="btn-size"
                  min-width="30"
                  :disabled="cart.qty <= 1"
                  @click="cart.qty -= 1"
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
                </button>
                <button
                  height="30"
                  color="grey"
                  class="mx-1 btn-size white-only black--text"
                  min-width="30"
                  elevation="0"
                  outlined
                >
                  {{ cart.qty }}
                </button>

                <button
                  @click="cart.qty += 1"
                  class="btn-size"
                  color="grey--text"
                  elevation="0"
                >
                  <svg
                    width="10"
                    height="10"
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
                </button>
                <v-btn
                  height="27"
                  style="font-size: 0.75rem"
                  class="ml-2"
                  elevation="0"
                  outlined
                  color="#F09E00"
                  @click="removeItem(index)"
                >
                  <v-icon small class="mr-1">mdi-cart-off</v-icon>
                  Remove from cart
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-center align-center flex-column" v-else>
      <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_jvclyiwj.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      <div
        style="font-size: 1.5rem; font-weight: 300"
        class="black--text unavailable"
      >
        Empty
      </div>
    </div>
  </main>
</template>

<script>
import ImageResolve from "../../components/ImageResolve.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ImageResolve,
  },
  data() {
    return {
      items: [
        {
          text: "Homepage",
          disabled: false,
          href: "#/products",
        },
        {
          text: "Your Cart",
          disabled: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("cart", ["getCart"]),
  },
  methods: {
    async removeItem(id) {
      this.$store.commit("cart/deleteFromCart", id);
    },
  },
};
</script>

<style>
.v-breadcrumbs__item:first-child {
  color: black !important;
  font: size 0.8rem;
  opacity: 0.7;
}
.cart-header {
  margin-top: 3rem;
}
.cart-header-text {
  margin-top: 0.5rem;
  font-size: 2rem;
  font-weight: 300;
}
.cart-card-area {
  height: 180px !important;
  width: 180px !important;
  padding: 1rem;
}
.cart-card-area img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.cart-info {
  width: 18rem;
}
.btn-size {
  min-width: 10px !important;
  background: rgba(128, 128, 128, 0.268) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.7rem !important;
  height: 1.7rem !important;
  font-size: 0.85rem;
  border-radius: 3px;
  border: 1px solid rgba(128, 128, 128, 0.268) !important;
}
.white-only {
  background: white !important;
}
</style>
