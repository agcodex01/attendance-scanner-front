<template>
  <v-app>
    <v-app-bar app color="#900303" dark absolute>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo_evsu.png"
          transition="scale-transition"
          width="40"
        />

        <h1>EVSU EMPLOYEE TRACKER</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">Time: {{ time }}</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary clipped bottom app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home/Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "App",
  data: () => ({
    time: null,
    drawer: false,
    group: null,
  }),
  methods: {
    ...mapActions({
      logout: 'auth/LOG_OUT'
    }),
    onLogout () {
      this.logout().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    }
  },
  mounted() {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
  },
};
</script>
