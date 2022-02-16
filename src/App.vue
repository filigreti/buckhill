<template>
  <v-app id="main">
    <top-header />
    <v-main>
      lorem7000
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TopHeader from "@/components/TopHeader";
export default {
  name: "App",
  components: {
    TopHeader,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
#main {
  background: #e5e5e5 !important;
}
.weight {
  font-weight: 300 !important;
  letter-spacing: 0.5px !important;
}
</style>
