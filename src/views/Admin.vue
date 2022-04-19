<template>
  <v-card elevation="10" class="mx-5 mt-5">
    <v-tabs v-model="tab" centered icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#users" @click="fetchUsersFn">
        Users
        <v-icon>mdi-account</v-icon>
      </v-tab>

      <v-tab href="#attendances" @click="fetchAttendancesFn">
        Attendances
        <v-icon>mdi-note</v-icon>
      </v-tab>

      <v-tab href="#activity_logs" @click="fetchLogsFn">
        Activity logs
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
      <v-tab href="#settings" @click="fetchLogsFn">
        Settings
        <v-icon>mdi-wrench</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="users">
        <v-card flat>
          <v-card-title>
            <v-btn
              elevation=""
              color="primary"
              :to="{ name: 'create_employee' }"
            >
              Add New
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-title>
            Users
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchEmployee"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="userHeaders"
            :items="users"
            :items-per-page="5"
            :search="searchEmployee"
            :loading="loading"
            loading-text="Fetching users"
            class="elevation-1"
          >
            <template v-slot:item.name="{ item }">
              <v-btn
                class="text-underlined"
                :to="{ name: 'update_employee', params: { id: item.id } }"
                small
                text
              >
                {{ item.name }}
              </v-btn>
            </template>
            <template v-slot:item.type="{ item }">
              <v-chip :color="item.type == 'admin' ? 'primary': 'warning'" dark label>
                {{ item.type }}
              </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="item.status == 'active' ? 'green': 'red'" dark>
                {{ item.status }}
              </v-chip>
            </template>
             <template v-slot:item.position="{ item }">
              
                {{ getDisplayPosition(item.position)  }}
             
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="attendances">
        <v-card flat>
          <v-card-title>
            Attendances
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchAttendance"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="attendanceHeader"
            :items="attendances"
            :items-per-page="5"
            :search="searchAttendance"
            class="elevation-1"
            loading-text="Fetching attendances.."
            :loading="loading"
          ></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="activity_logs">
        <v-card flat>
          <v-card-title>
            Activity Logs
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchLog"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="logHeader"
            :items="logs"
            :items-per-page="5"
            :search="searchLog"
            class="elevation-1"
            loading-text="Fetching Logs..."
            :loading="loading"
          ></v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item value="settings" class="pa-5">
        <h1>Settings</h1>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">
                Current Department</v-list-item-title
              >
            </v-list-item-content>
            <v-list-item-content>
              <v-select
                v-model="location"
                :items="constants.departments"
                item-text="display"
                item-value="value"
                label="Select"
                outlined
                single-line
                @change="setDepartment"
                dense
              ></v-select>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
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
        text: "Location",
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
  }),
  computed: {
    ...mapGetters({
      users: "user/GET_USERS",
      attendances: "attendance/GET_ALL",
      logs: "log/GET_LOGS",
      currentDepartment: "attendance/GET_CURRENT_DEPARTMENT",
    }),
  },
  methods: {
    ...mapActions({
      fetchUsers: "user/GET_USERS",
      fetchAttendances: "attendance/GET_ALL",
      fetchLogs: "log/GET_LOGS",
      setDepartment: "attendance/SET_DEPARTMENT",
    }),
    async fetchUsersFn() {
      this.loading = true;
      await this.fetchAttendances();
      this.loading = false;
    },
    async fetchAttendancesFn() {
      this.loading = true;
      await this.fetchAttendances();
      this.loading = false;
    },
    async fetchLogsFn() {
      this.loading = true;
      await this.fetchLogs();
      this.loading = false;
    },
    getDisplayPosition (position_value) {
      return this.constants.positions.find(x => x.value == position_value).display
    }
  },
  async mounted() {
    this.$store.dispatch("auth/SET_SHOW_ICON", true);
    this.loading = true;
    this.location = this.currentDepartment;
    await this.fetchUsers();
    this.loading = false;
  },
};
</script>
