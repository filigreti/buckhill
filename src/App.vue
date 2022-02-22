<template>
  <v-app>
    <vtoast ref="vtoast" />
    <v-main id="main">
      <top-header />
      <v-main class="admin-nav">
        <router-view />
      </v-main>
    </v-main>
  </v-app>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import vtoast from "@/components/Toast";

export default {
  name: "App",
  components: {
    TopHeader,
    vtoast,
  },
  data: () => ({
    //
  }),
  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
  },
  async created() {
    await this.$store.dispatch("global/getCategories");
    await this.$store.dispatch("global/getBlogs");
    await this.$store.dispatch("global/getPromotions");
    await this.$store.dispatch("global/getAllCategoriesAndBrands");
  },
};
</script>

<style>
* {
  font-family: "Roboto";
  box-sizing: border-box !important;
  margin: 0;
  padding: 0;
}
#main {
  background: #e5e5e5 !important;
}
.weight {
  font-weight: 300 !important;
  letter-spacing: 0.5px !important;
}
.v-application--wrap {
  min-height: unset !important;
}
.admin-nav {
  margin-top: 4rem !important;
  min-height: calc(100vh - 4rem) !important;
}
.custom-placeholer-color input::placeholder {
  color: #4ec690 !important;
  opacity: 1;
}
.custom-placeholer-color input {
  margin-left: 1rem;
}

.input-size fieldset {
  border: 1px solid #c9c5c5 !important;
}

.input-size input::placeholder {
  color: #7b7a7a !important;
}

.v-text-field fieldset,
.v-text-field .v-input__control {
  color: #4ec690 !important;
}

.v-text-field fieldset,
.v-text-field .v-input__control i {
  color: #4ec690 !important;
  margin-bottom: 1.3px;
}
.full-height {
  height: calc(100vh - 4rem - 130px) !important;
}
.full-height-cart {
  height: calc(100vh - 4rem) !important;
}
.cursor-pointer {
  cursor: pointer !important;
}
</style>
