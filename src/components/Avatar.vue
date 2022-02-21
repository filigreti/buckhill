<template>
  <v-avatar
    style="text-transform: uppercase"
    color="white black--text "
    :size="size"
  >
    {{ getUserInitials }}</v-avatar
  >
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    size: {
      type: Number || String,
      default: 42,
    },
  },
  computed: {
    ...mapGetters("auth", [
      "getSignedInStatus",
      "getUserData",
      "getUserInitials",
    ]),
  },
};
</script>

<style></style>
