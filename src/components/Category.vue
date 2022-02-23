<template>
  <main>
    <div
      class="mb-8"
      v-for="(category, index) in sortCategories"
      :key="category.uuid"
    >
      <router-link
        class="inline"
        :to="{
          name: 'Category',
          params: { category: category.slug, id: category.uuid },
        }"
      >
        <h1 class="primary--text font-weight-light format-text">
          {{ category.title }}
        </h1>
      </router-link>
      <carousel
        v-if="category.products.length && getBlogs.length"
        :navigationEnabled="true"
        :navigationClickTargetSize="100"
        class="mt-5 black--text"
        :perPage="5"
        :navigationPrevLabel="leftArrow"
        :navigationNextLabel="rightArrow"
      >
        <slide v-for="(product, index) in category.products" :key="index">
          <products style="width: 80%" :product="product" />
        </slide>
      </carousel>
      <div v-if="category.products.length && getBlogs.length">
        <blog :blog="getBlogs[index]" />
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
        <div class="black--text unavailable">No Item</div>
      </div>
    </div>
  </main>
</template>

<script>
import Products from "./Products.vue";
import { Carousel, Slide } from "vue-carousel";
import Blog from "./Blog.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    categories: {
      type: Array,
    },
  },
  components: { Products, Carousel, Slide, Blog },
  computed: {
    ...mapGetters("global", ["getBlogs"]),

    leftArrow() {
      return "<svg width='26' height='40' viewBox='0 0 26 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M25.367 4.7L20.667 0L0.666992 20L20.667 40L25.367 35.3L10.1003 20L25.367 4.7Z' fill='black' fill-opacity='0.54'/></svg>";
    },
    rightArrow() {
      return "<svg width='26' height='40' viewBox='0 0 26 40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M5.33379 0L0.633789 4.7L15.9005 20L0.633789 35.3L5.33379 40L25.3338 20L5.33379 0Z' fill='black' fill-opacity='0.54'/></svg>";
    },
    sortCategories() {
      return this.categories
        .sort((a, b) => {
          return b.products.length - a.products.length;
        })
        .slice(0, 2);
    },
  },
};
</script>

<style>
.format-text::first-letter {
  text-transform: capitalize;
}

.inline {
  display: inline-block;
  text-decoration: none;
}
.unavailable {
  margin-top: -2rem;
  font-size: 1.2rem;
}
</style>
