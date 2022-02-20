<template>
  <v-app>
    <v-navigation-drawer fixed class="admin-nav" permanent>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div class="content-nav">
      <router-view />
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
};
</script>

<style>
.content-nav {
  position: absolute;
  left: 17.5rem;
  top: 5.2rem;
  right: 1.5rem;
  bottom: 1.5rem;
}
</style>
