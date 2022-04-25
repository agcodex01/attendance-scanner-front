<template>
  <v-container class>
    <v-card elevation="11" class="pt-10 px-5">
      <div class="d-flex justify-space-between align-center">
        <v-breadcrumbs :items="links">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>

      <v-form @submit.prevent="onUpdateUser" ref="form" lazy-validation class="mt-10 mb-6 pr-8 pl-8 pb-8 pt-4">
        <v-row>
          <v-col cols="4" class="text-center">
            <v-avatar size="128" class="mb-5">
              <v-img max-width="200px" max-height="200px" :src="previewImage"></v-img>
            </v-avatar>
            <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar"
              prepend-icon="mdi-camera" label="Avatar" outlined dense @change="displayAvatar"
              :error="errors.avatar.hasError" :error-messages="errors.avatar.message"></v-file-input>
            <qr-code style="display:none" :text="userId" color="#900303" bg-color="#ffffff"></qr-code>
          </v-col>
          <v-col cols="6">
            <label for="name">Name</label>
            <v-text-field id="name" class="mt-3" v-model="user.name" append-icon="mdi-envelop" outlined color="purple"
              required dense :error="errors.name.hasError" :error-messages="errors.name.message"></v-text-field>
            <label for="email">Email</label>
            <v-text-field id="email" class="mt-3" v-model="user.email" append-icon="mdi-envelop" outlined color="purple"
              :rules="emailRules" required dense :error="errors.email.hasError" :error-messages="errors.email.message">
            </v-text-field>
            <label for="position">Position</label>
            <v-select id="position" v-model="user.position" :items="constants.positions" item-text="display"
              item-value="value" outlined single-line class="mt-3" dense></v-select>
            <label for="department">Department</label>
            <v-select id="department" v-model="user.department" :items="constants.departments" item-text="display"
              item-value="value" outlined single-line class="mt-3" dense :error="errors.department.hasError"
              :error-messages="errors.department.message"></v-select>
            <label for="status">Status</label>
            <v-select id="status" v-model="user.status" :items="constants.statuses" item-text="display"
              item-value="value" outlined single-line class="mt-3" dense :error="errors.status.hasError"
              :error-messages="errors.status.message"></v-select>
            <div>
              <v-btn color="primary darken-4" class="mr-4 text" :to="{ name: 'users' }">
                <span class="white--text">Back</span>
              </v-btn>
              <v-btn color="warning" class="mr-4 text" @click="downloadQrCode">
                <span class="white--text">Download QrCode</span>
              </v-btn>
              <v-btn type="submit" color="primary" class="mr-4 text" @click="validate" outlined :loading="loading">
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
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
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
    title: "Update User",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    user: {
      id: '',
      name: '',
      email: null,
      password: null,
      department: null,
      avatar: require("@/assets/default.jpg"),
      type: "employee",
      position: null,
      status: "active",
      qrcode: ''
    },
    select: null,
    loading: false,
    errors: UserError,
    userId: '',
    links: [
      {
        text: 'ECCEL',
        disabled: false,
        href: '/admin',
      },
      {
        text: 'Users',
        disabled: false,
        href: '/admin/users'
      },
      {
        text: 'Update User',
        disabled: true,

      }
    ]
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
    downloadQrCode() {
      const fileName = `${this.user.name}_qrocode.png`
      let canvas = document.getElementsByTagName("canvas")[0];
      if (canvas.msToBlob) {
        //for IE
        let blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        let link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
      return false;
    }
  },
  async mounted() {
    this.resetErrors();
    await this.fetchById(this.$route.params.id).then((user) => {
      this.previewImage = user.avatar;
      this.userId = user.id.toString()
      this.user = user;
    });
  },
};
</script>
