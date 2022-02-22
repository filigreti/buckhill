<template>
  <v-avatar
    style="text-transform: uppercase"
    :class="`${color} black--text`"
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
    color: {
      type: String,
      default: "white",
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
