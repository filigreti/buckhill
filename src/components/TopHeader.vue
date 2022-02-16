<template>
  <v-app-bar elevation="0" outlined app color="primary">
    <v-row justify="space-between" class="align-center" no-gutters>
      <v-col lg="3">
        <v-img
          class="mb-1"
          :src="require('../assets/logo.svg')"
          contain
          height="25"
        />
      </v-col>
      <v-col md="auto">
        <v-list
          height="auto"
          style="padding: 0px"
          :min-width="400"
          class="d-flex justify-space-between align-center"
          color="primary"
          dark
          flat
        >
          <v-list-item
            class="d-flex align-center"
            link
            v-for="child in items"
            :key="child.title"
            :to="child.route"
            :ripple="false"
          >
            <v-list-item-title
              tag="div"
              class="text-leading"
              :class="child.class"
              v-text="child.title"
            ></v-list-item-title>
            <v-list-item-icon class="ml-2" v-if="child.icon">
              <v-icon small v-text="child.icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col lg="3" class="d-flex justify-center">
        <v-btn class="weight mr-3" large outlined dark>
          <v-icon dark left> mdi-cart </v-icon>CART (0)
        </v-btn>
        <v-btn class="weight" large outlined dark> Login </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        route: "products",
        title: "PRODUCTS",
        icon: "mdi-chevron-down",
      },
      {
        route: "promotions",
        title: "PROMOTIONS",
      },
      {
        route: "blog",
        title: "BLOG",
        class: "ml-4",
      },
    ],
  }),
};
</script>

<style>
.white {
  color: white !important;
}
</style>
