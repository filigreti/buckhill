<template>
  <v-app>
    <v-navigation-drawer fixed class="admin-nav accent elevation-4" permanent>
      <v-list class="pt-0" dense>
        <v-list-item-group
          v-model="selectedItem"
          active-class="admin-active white--text"
        >
          <v-list-item
            exact-active-class="admin-active white--text"
            v-for="item in items"
            :key="item.title"
            class="admin-text"
            @click="$router.push({ name: item.route })"
          >
            <v-list-item-icon>
              <v-icon class="admin-text-link-icon" v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="admin-text-link">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div class="content-nav dim">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedItem: 4,
      items: [
        { title: "Dashboard", icon: "mdi-tune", route: "DashboardAdmin" },
        { title: "All tickets", icon: "mdi-subtitles", route: "TicketsAdmin" },
        {
          title: "Shipment Locator",
          icon: "mdi-map-marker",
          route: "ShipmentLocatorAdmin",
        },
        {
          title: "Customers",
          icon: "mdi-account-multiple-outline ",
          route: "CustomersAdmin",
        },
        {
          title: "Products",
          icon: "mdi-folder-outline",
          route: "ProductsAdmin",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["getUserData"]),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.getUserData.first_name === "Admin") {
        next();
      } else {
        next({ name: "Products" });
      }
    });
  },
  async created() {
    await this.$store.dispatch("admin/getCustomerlists");
  },
};
</script>

<style>
.content-nav {
  position: absolute;
  left: 256px;
  height: calc(100vh - 64px);
  width: 100%;
  /* overflow: auto; */
  padding: 2rem;
}
.admin-active {
  background: #2db479;
  color: #fff !important;
}
.admin-link {
  color: red;
}
.admin-text {
  color: #69817b !important;
}
.admin-text-link {
  font-weight: 400 !important;
  font-size: 0.9rem !important;
  padding: 10px 0 !important;
}
.admin-text-link-icon {
  margin-top: 10px !important;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 20px;
}
</style>
