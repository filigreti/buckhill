<template>
  <main>
    <v-breadcrumbs class="" :items="items" divider="/"></v-breadcrumbs>
  </main>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Homepage",
          disabled: false,
          href: "#/products",
          exact: true,
        },
        {
          text: "Your Cart",
          disabled: true,
        },
      ],
    };
  },
};
</script>

<style></style>
