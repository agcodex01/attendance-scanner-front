<template>
  <v-card elevation="3" class="mx-5 mt-5 py-5">
    <div class="d-flex justify-space-between align-center mb-6">
      <v-breadcrumbs :items="links">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="px-3">
      <v-row>
        <v-col v-for="stat in stats" :key="stat">
          <v-card elevation="3" max-width="300px">
            <v-card-title>
              <v-list-item class="grow">
                <v-list-item-avatar>
                  <v-icon class="mr-1">
                    {{ stat.icon }}
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> {{ stat.label }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title class="big-32"> {{ stat.total }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UserConstant from "../constants/user";
export default {
  name: "Admin",
  data: () => ({
    searchEmployee: "",
    searchAttendance: "",
    searchLog: "",
    tab: null,
    constants: UserConstant,
    userHeaders: [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Department",
        value: "department",
      },
      {
        text: "Position",
        value: "position",
      },
      {
        text: "User Type",
        value: "type",
      },
      {
        text: "Status",
        value: "status",
      },
    ],
    attendanceHeader: [
      {
        text: "User",
        value: "user.name",
      },
      {
        text: "Signin",
        value: "signin",
      },
      {
        text: "Signout",
        value: "signout",
      },
      {
        text: "Current Location",
        value: "location",
      },
    ],
    logHeader: [
      {
        text: "User",
        value: "user.name",
      },
      {
        text: "Scan At",
        value: "created_at",
      },
      {
        text: "Location",
        value: "location",
      },
    ],
    loading: false,
    location: null,
    links: [
      {
        text: 'ECCEL',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Dashboard',
        disabled: true,
        href: 'breadcrumbs_link_1',
      }
    ]
  }),
  computed: {
    ...mapGetters({
      stats: "admin/GET_STATS",

    }),
  },
  methods: {
    ...mapActions({
      fetchStats: "admin/GET_STATS",
    }),

  },
  async mounted() {
    this.loading = true;
    this.location = this.currentDepartment;
    await this.fetchStats();
    this.loading = false;
  },
};
</script>

<style>
.big-32 {
  font-size: 32px !important;
}
</style>
