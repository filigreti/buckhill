<template>
  <main>
    <template>
      <v-carousel
        :cycle="true"
        :interval="7000"
        hide-delimiters
        :show-arrows="false"
      >
        <v-carousel-item v-for="(item, i) in images" :key="i">
          <div class="relative">
            <v-img
              class="carousel-image"
              :src="item.image"
              cover
              height="500"
            />
            <div class="carousel-body-text">
              <div class="carousel-text big-text">{{ item.title }}</div>
              <div class="carousel-text mt-1">
                {{ item.content | truncate(40, ".") }}
              </div>
            </div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </template>
  </main>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
    },
  },
  methods: {
    async getItem(item) {
      // const value = await this.$store.dispatch("global/urlToBase64", {
      //   id: item.metadata.image,
      // });
      // console.log(value, "falue");
      // return value;
    },
  },
};
</script>

<style>
.carousel-image {
  position: absolute;
  filter: brightness(70%);
}
.carousel-body-text {
  padding: 2rem;
}
.carousel-text {
  position: relative;
  color: white;
  font-size: 0.8rem;
  font-weight: 300;
  background-color: rgba(0, 0, 0, 0.301);
  display: table;
  padding: 0.4rem 0.55rem;
}
.big-text {
  font-size: 1.9rem;
}
</style>
