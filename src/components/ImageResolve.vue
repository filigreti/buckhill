<template>
  <img :src="img" alt="" />
</template>

<script>
export default {
  props: ["image"],
  data() {
    return {
      img: "",
    };
  },
  async created() {
    const response = await this.$store.dispatch("global/urlToBase64", {
      id: this.image,
    });
    this.img = response;
  },
};
</script>

<style></style>
