<template>
  <main>
    <v-container>
      <v-row class="d-flex align-center">
        <v-col cols="8">
          <div class="blog-form" v-if="blog.image">
            <img :src="blog.image" />
          </div>
          <div class="blog-form" v-else>
            <img src="../assets/logo.svg" />
          </div>
        </v-col>
        <v-col cols="4">
          <h1 class="primary--text font-weight-light format-text leading">
            {{ blog.title }}
          </h1>
          <router-link to="/" class="primary white--text carousel-text mt-3">
            {{ blog.content | truncate("25", "...") }}
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
    },
  },
};
</script>

<style>
.leading {
  line-height: 2.5rem;
}
.blog-form {
  height: 400px;
  width: auto;
}
.blog-form img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
