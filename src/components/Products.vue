<template>
  <main>
    <v-hover v-slot="{ hover }">
      <v-card @click="productPage" :elevation="hover ? 1 : 0" class="card-area">
        <div>
          <v-img contain class="product-image" :src="product.image" />
        </div>
        <div class="mt-5 product-title">
          {{ product.title | truncate("15", "...") }}
        </div>
        <div class="product-label">{{ product.brand.title }}</div>
        <div class="product-price">{{ product.price }} kn</div>
        <v-btn
          v-if="addToCart"
          :disabled="getCart[product.uuid] ? true : false"
          class="weight primary mt-3 cart-button"
          outlined
          dark
          @click.stop="addToCartFunc"
        >
          <v-icon dark left> mdi-cart </v-icon>
          ADD TO CART
        </v-btn>
      </v-card>
    </v-hover>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    product: {
      type: Object,
    },
    addToCart: {
      type: Boolean,
      default: false,
    },
    route: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters("global", ["getProductDetails"]),
    ...mapGetters("cart", ["getCart"]),
  },
  methods: {
    productPage() {
      this.$store.commit("global/updateState", {
        type: "productDetail",
        data: { ...this.product },
      });
      this.$router.push({
        name: "ProductPage",
        params: { id: this.product.uuid },
      });
    },
    addToCartFunc() {
      let { uuid, price, image, title } = this.product;
      const payload = {
        [uuid]: { price, image, title, qty: 1 },
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
};
</script>

<style>
.product-image {
  height: 150px;
  width: auto;
  width: 200px;
  margin-bottom: 10px;
  margin: auto;
}
.VueCarousel-wrapper {
  padding: 10px !important;
}
.card-area {
  width: 100%;
  padding: 30px 20px;
}
.product-title {
  text-decoration: underline;
  font-weight: 500;
  font-size: 0.9rem;
}
.product-label {
  font-size: 0.7rem;
  opacity: 0.6;
  text-transform: capitalize;
}

.product-price {
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: 0.1rem;
}

.VueCarousel-navigation-button {
  top: 10rem !important;
}

.cart-button {
  font-size: 0.8rem !important;
}

button:focus {
  outline: none !important;
}
</style>
