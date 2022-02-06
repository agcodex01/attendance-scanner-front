<template>
  <v-container class="">
    <v-card elevation="11" class="pt-10 px-5">
      <h2 class="text-uppercase">{{ title }}</h2>

      <v-form
        @submit.prevent="onLogin"
        ref="form"
        v-model="valid"
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
              @change="showSelected"
            ></v-select>
            <v-select
              v-model="user.type"
              :items="constants.types"
              item-text="display"
              item-value="value"
              label="Type"
              outlined
              single-line
              @change="showSelected"
            ></v-select>
            <v-select
              v-model="user.department"
              :items="constants.departments"
              item-text="display"
              item-value="value"
              label="Department"
              outlined
              single-line
              @change="showSelected"
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
                :disabled="!valid"
                color="primary"
                class="mr-4 text"
                @click="validate"
                outlined
              >
                <span>Update</span>
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
export default {
  name: "UpdateEmployee",
  data: () => ({
    valid: true,
    snackbar: false,
    text: "",
    show1: false,
    show2: false,
    constants: UserConstant,
    previewImage: require("@/assets/default.jpg"),
    items: [
      { display: "Gate Entrance", value: "gate_entrance" },
      { display: "Department", value: "department" },
      { display: "Admin Dashboard", value: "admin" },
    ],
    title: "Update user",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be less than 8 characters",
    ],
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
      type: null,
      position: null,
      status: "active",
    },
    select: null,
  }),
  methods: {
    ...mapActions({
      updateUser: "user/UPDATE_USER",
      fetchById: "user/FIND_USER_BY_ID",
    }),
    validate() {
      this.$refs.form.validate();
    },
    //Login method here
    async onLogin() {
      //api call here
      this.updateUser({ userInfo: this.user, id: this.$route.params.id }).then(
        (user) => {
          this.text = `User ${user.name} successfully created.`;
          this.snackbar = true;
          this.$router.push({
            name: "admin",
          });
        }
      );

      console.log("CALL API", this.user);
    },
    showSelected() {
      console.log(this.select);
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
    await this.fetchById(this.$route.params.id).then((user) => {
      this.previewImage = user.avatar;
      this.user = user;
      console.log("UYY", this.user);
    });
  },
};
</script>
