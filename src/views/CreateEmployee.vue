<template>
  <v-container class="">
    <v-card elevation="11" class="pt-10 px-5">
      <h2 class="text-uppercase">{{ title }}</h2>

      <v-form
        @submit.prevent="onCreateUser"
        ref="form"
        v-model="valid"
        lazy-validation
        class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
      >
        <v-row>
          <v-col>
            <v-img
              max-width="200px"
              max-height="200px"
              position="center center"
              :src="previewImage"
            ></v-img>
            <v-divider class="mb-3"></v-divider>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              outlined
              dense
              @change="displayAvatar"
              :error="errors.avatar.hasError"
              :error-messages="errors.avatar.message"
            ></v-file-input>
          </v-col>
          <v-col>
            <v-text-field
              v-model="user.name"
              append-icon="mdi-envelop"
              outlined
              color="purple"
              error-count="2"
              label="Name"
              required
              :error="errors.name.hasError"
              :error-messages="errors.name.message"
            ></v-text-field>
            <v-text-field
              v-model="user.email"
              append-icon="mdi-envelop"
              outlined
              color="purple"
              error-count="2"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-select
              v-model="user.position"
              :items="constants.positions"
              item-text="display"
              item-value="value"
              label="Position"
              outlined
              single-line
              :error="errors.position.hasError"
              :error-messages="errors.position.message"
            ></v-select>
            <v-select
              v-model="user.department"
              :items="constants.departments"
              item-text="display"
              item-value="value"
              label="Department"
              outlined
              single-line
              :error="errors.department.hasError"
              :error-messages="errors.department.message"
            ></v-select>
            <div>
              <v-btn
                x-large
                color="primary darken-4"
                class="mr-4 text"
                :to="{ name: 'admin' }"
              >
                <span class="white--text">Back</span> </v-btn
              ><v-btn
                x-large
                type="submit"
                color="primary"
                class="mr-4 text"
                @click="validate"
                outlined
                :loading="loading"
              >
                <span>Register</span>
                <template v-slot:loader>
                  <span>Loading...</span>
                </template>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import UserConstant from "../constants/user";
import UserError from "../constants/UserError";
export default {
  name: "CreateEmployee",
  data: () => ({
    valid: true,
    snackbar: false,
    text: "",
    show1: false,
    show2: false,
    constants: UserConstant,
    previewImage: require("@/assets/default.jpg"),
    title: "Create user",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    user: {
      name: null,
      email: null,
      department: null,
      avatar: require("@/assets/default.jpg"),
      type: "employee",
      position: null,
      status: "active",
    },
    select: null,
    loading: false,
    errors: UserError,
  }),
  methods: {
    ...mapActions({
      createUser: "user/CREATE_USER",
    }),
    resetErrors() {
      Object.keys(this.errors).forEach((key) => {
        this.errors[key].message = null;
        this.errors[key].hasError = false;
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    async onCreateUser() {
      this.loading = true;
      this.resetErrors()
      this.createUser(this.user)
        .then((user) => {
          this.text = `User ${user.name} successfully created.`;
          this.snackbar = true;
          this.$router.push({
            name: "admin",
          });
        })
        .catch((error) => {
          Object.keys(this.errors).forEach((key) => {
            if (key in error) {
              this.errors[key].message = error[key];
              this.errors[key].hasError = true;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });

      console.log("CALL API", this.user);
    },
    displayAvatar(file) {
      if (file) {
        this.user.avatar = file;
        this.previewImage = URL.createObjectURL(file);
      } else {
        this.user.avatar = null;
        this.previewImage = require("@/assets/default.jpg");
      }
    },
  },
  mounted() {
    this.$store.dispatch(
      "auth/SET_SHOW_ICON",
      true
    );
    this.resetErrors()
  },
};
</script>
