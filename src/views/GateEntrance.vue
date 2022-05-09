<template>
  <v-container fluid class="mt-5">
    <v-snackbar height="80px" min-width="1000px" class="text-center" top centered :color="type" v-model="showNotif"
      :timeout="3000">
      {{ text }}
    </v-snackbar>
    <v-row>
      <v-col cols="3">
        <div v-if="loading">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </div>
        <div v-else>
          <h3>Gate Entrance Scanner</h3>
          <vue-qr-reader style="width:100%" v-on:code-scanned="codeArrived" :stop-on-scanned="false" />
          WebCam Scanned: {{ userId }}
          <h4 v-if="processing">
            Processing...
            <v-progress-circular :size="25" color="primary" indeterminate></v-progress-circular>
          </h4>
        </div>
        <v-btn color="primary" class="mt-3" @click="openSearchUser">Search User</v-btn>
      </v-col>
      <v-col cols="9">
        <div v-if="isFetching">
          <v-row>
            <v-skeleton-loader type="list-item-avatar, divider, list-item-three-line, card-heading" v-for="i in 3"
              :key="i" class="col-4 mb-4"></v-skeleton-loader>
          </v-row>
        </div>
        <div v-else>
          <v-carousel v-model="displayIndex" cycle hide-delimiter-background show-arrows-on-hover
            v-if="attendances.length > 0" height="100%">
            <v-carousel-item v-for="(attendanceChunck, i) in attendances" :key="i">
              <attendance-profile-list :attendances="attendanceChunck" />
            </v-carousel-item>
          </v-carousel>
          <v-alert v-else border="top" elevation="2" type="info" colored-border>
            No attendance yet for this day.
          </v-alert>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="py-8">
        <v-card-text>
          <v-select v-model="selectedUser" :items="scanInUsers" item-text="name" item-value="atttendance_id" key="id"
            label="User" outlined dense class="col-3" @change="setSelectedAttendance" clearable>
          </v-select>
        </v-card-text>
        <v-card-text>
          <attendance-profile v-if="searchAttendance" :attendance="searchAttendance" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false" block outlined color="primary">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import VueQrReader from "vue-qr-reader/dist/lib/vue-qr-reader.umd.js";
import { mapActions, mapGetters } from "vuex";
import AttendanceProfileList from "../components/AttendanceProfileList";
import AttendanceProfile from "../components/AttendanceProfile";
export default {
  name: "GateEntrance",
  components: {
    VueQrReader,
    AttendanceProfileList,
    AttendanceProfile,
  },
  data: () => ({
    afterScan: null,
    displayIndex: 0,
    userId: null,
    showErorr: false,
    text: null,
    processing: false,
    loading: false,
    showNotif: false,
    type: "green",
    dialog: false,
    searchAttendance: null,
    selectedUser: null,
    scanInUsers: []
  }),
  computed: {
    ...mapGetters({
      attendances: "attendance/GET_ATTENDANCES",
      isFetching: "attendance/GET_ATTENDANCES_FETCHING",
    }),
  },
  methods: {
    ...mapActions({
      fetchAttendance: "attendance/GET_ATTENDANCES",
      sign: "attendance/SIGN",
    }),
    codeArrived(userId) {
      const currentTime = new Date().getTime();
      if (
        !this.afterScan ||
        (currentTime - this.afterScan > 5000 && !this.processing)
      ) {
        this.processing = true;
        this.sign(userId)
          .then(({ data }) => {
            if (data.signout) {
              this.text = `${data.user.name} school signout successfully.`;
            } else {
              this.text = `${data.user.name} school signin successfully.`;
            }
            this.type = "green";
            this.showNotif = true;
          })
          .catch((error) => {
            if (error.status == 404) {
              this.text = 'Invalid QrCode scanned.'
            } else {
              this.text = error.data.errors;
            }

            this.type = "red";
            this.showNotif = true;
          })
          .finally(() => {
            console.log("SCANNED ID: ", userId);
            this.processing = false;
            this.userId = userId;
          });
        this.afterScan = currentTime;
      }
    },
    openSearchUser() {
      this.attendances.forEach(cA => {
        if (!Array.isArray(cA)) {
          cA = Object.values(cA)
        }
        cA.forEach(a => {
          this.scanInUsers.push({
            name: a.user.name,
            atttendance_id: a.id
          })
        })
      });
      this.dialog = true
    },
    setSelectedAttendance(attendance_id) {
      this.searchAttendance = null
      this.attendances.forEach(cA => {
        if (!Array.isArray(cA)) {
          cA = Object.values(cA)
        }

        cA.forEach(a => {
          if (a.id == attendance_id) {
            this.searchAttendance = a
          }
        })
      });
    }
  },
  async mounted() {
    this.$store.dispatch(
      "auth/SET_SHOW_ICON",
      true
    );
    this.loading = true;
    await this.fetchAttendance({});
    this.loading = false;
    console.log('A', this.attendances);
  },
};
</script>

<style>
.v-dialog__content {
  align-items: flex-start;
  justify-content: flex-center;
}

.v-snack__content {
  font-size: 1.875rem !important;
  text-align: center;
}
</style>
