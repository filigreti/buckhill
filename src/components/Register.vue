<template>
  <main>
    <div class="d-flex justify-center align-center flex-column">
      <h3 class="font-weight-regular mt-3">Sign up</h3>
    </div>
    <v-form ref="form">
      <v-row>
        <v-col>
          <v-text-field
            class="mt-4 black--text input-size"
            placeholder="First Name *"
            outlined
            :rules="[(v) => !!v || 'First Name is required']"
            type="text"
            single-line
            height="20"
            v-model="first_name"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            class="mt-4 black--text input-size"
            placeholder="Last Name *"
            outlined
            :rules="[(v) => !!v || 'Last Name is required']"
            type="text"
            single-line
            height="20"
            v-model="last_name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        class="mt-n5 black--text input-size"
        placeholder="Email Address *"
        outlined
        :rules="[
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ]"
        type="email"
        single-line
        height="20"
        v-model="email"
      ></v-text-field>
      <v-text-field
        class="black--text form-input input-size"
        placeholder="Password *"
        outlined
        type="password"
        :passwordRules="[
          (value) => !!value || 'Please type password.',
          (value) => (value && value.length >= 6) || 'minimum 6 characters',
        ]"
        single-line
        height="20"
        v-model="password"
      ></v-text-field>
      <v-text-field
        class="black--text form-input input-size"
        placeholder="Confirm Password *"
        outlined
        type="password"
        single-line
        :rules="confirmPasswordRules"
        height="20"
        v-model="password_confirmation"
      ></v-text-field>
      <v-checkbox
        class="mt-n1 ml-1"
        label="I want to receive inspiration, marketing
promotions and updates via email."
        :value="false"
      ></v-checkbox>
      <v-btn
        @click="registerUser"
        class="weight primary mt-2"
        block
        elevation="1"
        large
        dark
      >
        SIGN UP
      </v-btn>
      <div class="mt-7 d-flex justify-center">
        <div
          @click="$emit('toggle', 'login')"
          class="blue--text form-link cursor-pointer"
          to="/forgot-password"
        >
          Already have an account? Log in
        </div>
      </div>
    </v-form>
  </main>
</template>

<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",

      confirmPasswordRules: [
        (value) => !!value || "Confirm Password is required",
        (value) =>
          value === this.password ||
          "The password confirmation does not match.",
      ],
    };
  },
  methods: {
    async registerUser() {
      const validate = this.$refs.form.validate();
      if (!validate) {
        return;
      }
      const response = await this.$store.dispatch("auth/register", {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        address: "Lagos, Nigeria",
        phone_number: "08120854426",
      });
      if (response.data.success === 0) {
        Object.values(response.data.errors).forEach((data) => {
          this.$root.vtoast.error({ message: data[0] });
        });
      }
      if (response.status === 200) {
        this.$root.vtoast.show({ message: "User created succesfully" });
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
        this.$emit("close");
      }
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
</style>
