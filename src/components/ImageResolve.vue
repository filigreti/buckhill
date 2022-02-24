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
  watch: {
    image: {
      immediate: true,
      async handler(val) {
        const response = await this.$store.dispatch("global/urlToBase64", {
          id: this.image,
        });
        this.img = response;
        this.$forceUpdate();
      },
    },
  },
};
</script>

<style></style>
