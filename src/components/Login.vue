<template>
  <main>
    <div class="d-flex justify-center align-center flex-column">
      <h3 class="font-weight-regular mt-3">Log in</h3>
    </div>
    <v-form ref="form">
      <v-text-field
        class="mt-4 black--text input-size"
        placeholder="Email Address *"
        outlined
        type="email"
        :rules="[
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]"
        single-line
        height="20"
        v-model="email"
      ></v-text-field>
      <v-text-field
        class="black--text form-input input-size"
        placeholder="Password *"
        outlined
        type="password"
        single-line
        height="20"
        v-model="password"
        :rules="passwordRules"
      ></v-text-field>
      <v-checkbox
        class="mt-n1 ml-1"
        label="Remember me"
        :value="true"
      ></v-checkbox>
      <v-btn
        @click="loginUser"
        class="weight primary mt-2"
        block
        elevation="1"
        large
        dark
      >
        LOG IN
      </v-btn>
      <div class="mt-7 d-flex justify-space-between">
        <router-link class="blue--text form-link" to="/forgot-password"
          >Forgot Password?</router-link
        >
        <div
          @click="$emit('toggle', 'signup')"
          class="blue--text form-link cursor-pointer"
        >
          Don’t have an account? Sign Up
        </div>
      </div>
    </v-form>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  computed: {
    // ...mapGetters("auth", ["login"]),
  },
  methods: {
    async loginUser() {
      const validate = this.$refs.form.validate();
      if (!validate) {
        return;
      }
      const response = await this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
      if (response.data.success === 0) {
        if (response.data.errors.length) {
          Object.values(response.data.errors).forEach((data) => {
            this.$root.vtoast.error({ message: data[0] });
          });
        } else {
          this.$root.vtoast.error({ message: response.data.error });
        }
      }
      if (response.data.success === 1) {
        this.$root.vtoast.show({
          message: `Welcome Back, ${response.data.data.userData.data.first_name}`,
        });

        this.$emit("close");
      }
      console.log(response, "validate");
    },
  },
};
</script>

<style>
.form-input {
  margin-top: -0.5rem !important;
  /* height: 4rem; */
}
.form-link {
  text-decoration: none;
  letter-spacing: 0.2px !important;
  font-size: 0.75rem;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
}
.v-messages__wrapper {
  margin-bottom: 1rem;
}
</style>
