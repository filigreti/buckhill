<template>
  <v-snackbar
    :color="color"
    :timeout="timer"
    v-model="showSnackbar"
    bottom
    right
    tile
    height="50"
  >
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "primary",
      icon: "mdi-check",
      timer: 5000,
    };
  },
  methods: {
    show(data) {
      this.message = data.message || 'missing "message".';
      this.color = data.color || "primary";
      this.timer = data.timer || 5000;
      this.icon = data.icon || "mdi-check";
      this.showSnackbar = true;
    },
    error(data) {
      this.message = data.message || 'missing "message".';
      this.color = data.color || "red";
      this.timer = data.timer || 5000;
      this.icon = data.icon || "mdi-alert-circle-outline";
      this.showSnackbar = true;
    },
  },
};
</script>
