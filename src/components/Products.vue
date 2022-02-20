<template>
  <main>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 1 : 0" class="card-area">
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
          class="weight primary mt-3 cart-button"
          outlined
          dark
        >
          <v-icon dark left> mdi-cart </v-icon> ADD TO CART
        </v-btn>
      </v-card>
    </v-hover>
  </main>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
    addToCart: {
      type: Boolean,
      default: false,
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
