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
        <v-col lg="3" class="d-flex justify-center align-center">
          <v-btn class="weight mr-3" large outlined dark>
            <v-icon dark left> mdi-cart </v-icon>CART (0)
          </v-btn>
          <div class="mr-10" v-if="getSignedInStatus">
            <v-btn class="weight mr-5" large outlined dark> Logout </v-btn>
            <v-avatar
              style="text-transform: uppercase"
              color="white black--text "
              size="42"
            >
              {{ initials }}</v-avatar
            >
          </div>

          <v-dialog v-model="dialog" max-width="480">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="!getSignedInStatus"
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
              <login
                @close="dialog = false"
                @toggle="type = $event"
                v-if="type === 'login'"
              />
              <register
                @toggle="type = $event"
                @close="dialog = false"
                v-else
              />
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
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters("auth", ["getSignedInStatus", "getUserData"]),
    initials() {
      const fullName =
        this.getUserData.first_name + " " + this.getUserData.last_name;
      return fullName
        .split(" ")
        .map((n) => n[0])
        .join("");
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.type = "login";
      }
    },
  },
  mounted() {
    const fullName = this.console.log(this.initials, "jj");
  },
};
</script>

<style>
.white {
  color: white !important;
}
</style>
