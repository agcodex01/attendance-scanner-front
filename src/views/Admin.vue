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
        <v-col v-for="(stat, i) in stats" :key="i">
          <v-card elevation="3" max-width="300px">
            <v-card-title class="border-top-left">
              <v-list-item class="grow">
                <v-list-item-avatar>
                  <v-icon class="mr-1" color="indigo">
                    {{ stat.icon }}
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title> {{ stat.label }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title class="big-32">
                    {{ stat.total }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="px-2 mt-4">
      <v-card flat>
        <v-card-title> Recent Attendances </v-card-title>
        <v-data-table
          hide-default-footer
          :headers="attendanceHeader"
          :items="attendances"
          :items-per-page="5"
          class="elevation-1"
          loading-text="Fetching attendances.."
          :loading="loading"
          no-data-text="Current no attendance recorded."
        >
        </v-data-table>
      </v-card>
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Admin",
  data: () => ({
    loading: false,
    links: [
      {
        text: "ECCEL",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Dashboard",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],
    attendanceHeader: [
      {
        text: "User",
        value: "user.name",
      },
      {
        text: "Scan In",
        value: "signin",
      },
      {
        text: "Scan Out",
        value: "signout",
      },
      {
        text: "Current Location",
        value: "location",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      stats: "admin/GET_STATS",
      attendances: "attendance/GET_ALL",
    }),
  },
  methods: {
    ...mapActions({
      fetchStats: "admin/GET_STATS",
      fetchAttendances: "attendance/GET_ALL",
    }),
  },
  async mounted() {
    this.loading = true;
    this.location = this.currentDepartment;
    await this.fetchStats();
    await this.fetchAttendances({});
    this.loading = false;
  },
};
</script>

<style>
.big-32 {
  font-size: 32px !important;
}

.border-top-left {
  border-left: 10px solid red;
}
</style>
