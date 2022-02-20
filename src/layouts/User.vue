<template>
  <main class="white">
    <v-container>
      <v-row class="d-flex flex-column justify-center align-center">
        <v-col cols="12" lg="5" xl="4" sm="5" class="mt-5">
          <text-input />
        </v-col>
      </v-row>
    </v-container>
    <router-view class="full-height white" />
  </main>
</template>

<script>
import TextInput from "@/components/TextInput";

export default {
  components: {
    TextInput,
  },
};
</script>

<style></style>
