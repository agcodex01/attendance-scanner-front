<template>
  <v-app class="">
    <v-app-bar app color="#900303" dark absolute>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h2>EVSU-CC EMPLOYEE LOCATOR</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2">Time: {{ time }}</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute app>

      <v-row class="fill-heigth">
        <v-col>
          <v-sheet color="grey lighten-4" class="pa-4">
            <v-avatar class="mb-4" color="grey darken-1" size="64">
              <v-img alt="Vuetify Logo" src="@/assets/logo_evsu.png" />
            </v-avatar>

            <div>{{ user.email }}</div>
          </v-sheet>

          <v-divider></v-divider>
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4" v-if="showLinks">
              <v-list-item to="/admin" exact>
                <v-list-item-icon>
                  <v-icon>mdi-dots-grid</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Dashboard</v-list-item-title>
              </v-list-item>
              <v-list-item to="/admin/users" exact>
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Users</v-list-item-title>
              </v-list-item>
              <v-list-item to="/admin/attendances" exact>
                <v-list-item-icon>
                  <v-icon>mdi-format-list-checks</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Attendances</v-list-item-title>
              </v-list-item>
              <v-list-item to="/admin/logs" exact>
                <v-list-item-icon>
                  <v-icon>mdi-format-list-group</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Activity Logs</v-list-item-title>
              </v-list-item>
              <v-list-item to="/admin/setting" exact>
                <v-list-item-icon>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
            </v-list-item-group>

            <v-list-item-group class="fixedBottom">
              <v-list-item @click="onLogout">
                <v-list-item-icon>
                  <v-icon>mdi-logout-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Logout</v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Layout',
  data: () => ({
    time: null,
    drawer: true,
    group: null,
    showLinks: false
  }),
  methods: {
    ...mapActions({
      logout: "auth/LOG_OUT",
      fetchAttendance: "attendance/GET_ATTENDANCES",
    }),
    onLogout() {
      this.logout().then(() => {
        this.$router.push({
          name: "home",
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/GET_USER'
    })
  },
  mounted() {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
    window.Echo.channel("signin").listen("NewSignIn", async () => {
      this.$store.dispatch("attendance/GET_ATTENDANCES");
    });
    
    this.showLinks = this.$route.path.startsWith('/admin')
    
  },
}
</script>

<style>
.fixedBottom {
  position: absolute !important;
  bottom: 0 !important;
  width: 100%;
}
</style>