<template>
  <main>
    <h2 class="text-center setting-header mb-3">User settings</h2>

    <div class="d-flex mt-12">
      <div class="setting-top-container">
        <avatar color="primary white--text" :size="100" />
      </div>
      <v-row class="ml-10">
        <v-col v-for="(item, index) in formatUserData" :key="index" lg="4"
          ><div class="setting-header-text">{{ index }}</div>
          <div class="setting-header-body-text">{{ item }}</div>
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Avatar from "./Avatar.vue";
import moment from "moment";

export default {
  data() {
    return {
      moment,
    };
  },
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters("auth", ["getUserData"]),
    formatUserData() {
      return {
        Name:
          this.getUserData["first_name"] + " " + this.getUserData["last_name"],
        "Phone number": this.getUserData["phone_number"],
        Address: this.getUserData["address"],
        "Date Joined": moment(this.getUserData["created_at"]).format(
          "DD. M. yyyy"
        ),
        Email: this.getUserData["email"],
        "Marketing preferences":
          this.getUserData["is_marketing"] === 0 ? "No" : "Yes",
      };
    },
  },
};
</script>

<style>
.setting-header {
  font-size: 1.25rem;
  font-weight: 400;
  opacity: 0.9;
}
.setting-top-container {
  border-right: 1px solid #dde3e2;
  display: flex;
  width: 14rem;
  justify-content: center;
}
.setting-header-text {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.556);
}
.setting-header-body-text {
  font-size: 0.82rem;
  letter-spacing: 0.1px;
}
</style>
