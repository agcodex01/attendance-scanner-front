<template>
  <v-container class="">
    <v-card elevation="11" class="pt-10 px-5">
      <h2 class="text-uppercase">{{ title }}</h2>

      <v-form
        @submit.prevent="onUpdateUser"
        ref="form"
        lazy-validation
        class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4"
      >
        <v-row>
          <v-col cols="4" class="bg-primary">
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
            <h3>User QrCode</h3>
            <v-img
              max-width="200px"
              max-height="200px"
              position="center center"
              :src="user.qrcode"
            ></v-img>
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
              :error="errors.email.hasError"
              :error-messages="errors.email.message"
            ></v-text-field>
            <v-select
              v-model="user.position"
              :items="constants.positions"
              item-text="display"
              item-value="value"
              label="Position"
              outlined
              single-line
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
                <span>Update</span>
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
  name: "UpdateEmployee",
  data: () => ({
    snackbar: false,
    text: "",
    constants: UserConstant,
    previewImage: require("@/assets/default.jpg"),
    title: "Update user",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    user: {
      qrcode: null,
      name: null,
      email: null,
      password: null,
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
      updateUser: "user/UPDATE_USER",
      fetchById: "user/FIND_USER_BY_ID",
    }),
    validate() {
      this.$refs.form.validate();
    },
    resetErrors() {
      Object.keys(this.errors).forEach((key) => {
        this.errors[key].message = null;
        this.errors[key].hasError = false;
      });
    },
    async onUpdateUser() {
      this.loading = true;
      this.resetErrors();
      this.updateUser({ userInfo: this.user, id: this.$route.params.id })
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
    getUrl(base64) {
      return URL.createObjectURL(new File([new Blob([base64])], "QrCode.png"));
    },
  },
  async mounted() {
    this.$store.dispatch(
      "auth/SET_SHOW_ICON",
      true
    );
    this.resetErrors();
    await this.fetchById(this.$route.params.id).then((user) => {
      this.previewImage = user.avatar;
      this.user = user;
    });
  },
};
</script>
