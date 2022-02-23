<template>
  <v-container v-if="getLoading" fluid>
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

  <v-container v-else fluid>
    <v-row class="d-flex flex-column justify-center align-center">
      <v-col
        v-if="getPromotionsData.length"
        cols="12"
        lg="8"
        xl="7"
        sm="5"
        class="mt-2"
      >
        <carousel :images="getPromotionsData" />
      </v-col>
      <v-col
        v-if="Object.keys(getCategories).length"
        cols="12"
        lg="8"
        xl="6"
        sm="5"
        class="mt-5"
      >
        <Category :categories="getAllCategories" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Carousel from "@/components/Carousel";
import Category from "@/components/Category";

import { mapGetters } from "vuex";

export default {
  components: {
    Carousel,
    Category,
  },
  computed: {
    ...mapGetters("global", ["getLoading", "getPromotions", "getCategories"]),
    getPromotionsData() {
      return this.getPromotions;
    },
    getAllCategories() {
      return this.getCategories && this.getCategories.data
        ? this.getCategories.data
        : [];
    },
  },
};
</script>

<style>
.size {
  margin-top: 1rem;
}
</style>
