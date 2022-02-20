<template>
  <v-app>
    <v-app-bar fixed absoute elevation="0" outlined color="primary">
      <v-row justify="space-between" class="align-center" no-gutters>
        <v-col lg="3">
          <router-link to="/">
            <v-img
              class="mb-1"
              :src="require('../assets/logo.svg')"
              contain
              height="25"
            />
          </router-link>
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
          <v-dialog v-model="dialog" max-width="480">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="weight"
                large
                outlined
                dark
              >
                Login
              </v-btn>
            </template>

            <div class="pt-8 pb-12 white px-16 black--text">
              <router-link to="/">
                <v-img
                  class="mb-1"
                  :src="require('../assets/logo2.svg')"
                  contain
                  height="68"
                />
              </router-link>
              <login @toggle="type = $event" v-if="type === 'login'" />
              <register @toggle="type = $event" v-else />
            </div>
          </v-dialog>
        </v-col>
      </v-row>
    </v-app-bar>
  </v-app>
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  components: { Login, Register },
  data: () => ({
    dialog: false,
    type: "login",
    items: [
      {
        route: "/products",
        title: "PRODUCTS",
        icon: "mdi-chevron-down",
      },
      {
        route: "/promotions",
        title: "PROMOTIONS",
      },
      {
        route: "/blog",
        title: "BLOG",
        class: "ml-4",
      },
    ],
  }),
  watch: {
    dialog(val) {
      if (!val) {
        this.type = "login";
      }
    },
  },
};
</script>

<style>
.white {
  color: white !important;
}
</style>
