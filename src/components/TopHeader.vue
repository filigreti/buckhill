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
          <v-btn
            @click="$router.push({ name: 'Cart' })"
            class="weight mr-3"
            large
            outlined
            dark
          >
            <v-icon dark left> mdi-cart </v-icon>CART ({{
              Object.keys(getCart).length
            }})
          </v-btn>
          <v-btn
            @click="dialog = true"
            v-if="!getSignedInStatus"
            class="weight"
            large
            outlined
            dark
          >
            Login
          </v-btn>
          <div class="mr-10" v-if="getSignedInStatus">
            <v-btn @click="logoutUser" class="weight mr-5" large outlined dark>
              Logout
            </v-btn>
            <avatar
              @click.native="userProfileDialog = true"
              class="cursor-pointer"
            />
            <v-dialog v-model="userProfileDialog" max-width="900">
              <div class="pt-8 pb-12 white px-10 black--text">
                <settings />
              </div>
            </v-dialog>
          </div>

          <v-dialog v-model="dialog" max-width="480">
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
import Settings from "./Settings.vue";
import Avatar from "./Avatar.vue";

export default {
  components: { Login, Register, Avatar, Settings },
  data: () => ({
    dialog: false,
    userProfileDialog: false,
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
    ...mapGetters("cart", ["getCart"]),
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.type = "login";
      }
    },
  },
  methods: {
    async logoutUser() {
      const response = await this.$store.dispatch("auth/logout");
      if (response.success === 1) {
        this.$root.vtoast.show({
          message: `Logged out successfully`,
        });
      }
    },
  },
  mounted() {},
};
</script>

<style>
.white {
  color: white !important;
}
</style>
