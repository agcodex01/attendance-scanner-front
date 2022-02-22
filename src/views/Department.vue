<template>
  <v-container fluid>
    <v-row justify="space-between">
      <v-col cols="3">
        <div v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </div>
        <div v-else>
          <vue-qr-reader
            v-on:code-scanned="codeArrived"
            :stop-on-scanned="false"
          />
          WebCam Scanned: {{ userId }}
          <h4 v-if="processing">
            Processing...
            <v-progress-circular
              :size="25"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </h4>
        </div>
      </v-col>

      <v-col cols="9">
        <div v-if="loading">
          <v-row>
            <v-skeleton-loader
              type="list-item-avatar, divider, list-item-three-line, card-heading"
              v-for="i in 3"
              :key="i"
              class="col-4 mb-4"
            ></v-skeleton-loader>
          </v-row>
        </div>
        <div v-else>
          <v-carousel
            v-model="displayIndex"
            cycle
            wi
            hide-delimiter-background
            show-arrows-on-hover
            v-if="attendances.length > 0"
          >
            <v-carousel-item
              v-for="(attendanceChunck, i) in attendances"
              :key="i"
            >
              <attendance-profile-list :attendances="attendanceChunck" />
            </v-carousel-item>
          </v-carousel>
          <v-alert v-else border="top" elevation="2" type="info" colored-border>
            No attendance yet for this day.
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import VueQrReader from "vue-qr-reader/dist/lib/vue-qr-reader.umd.js";
import { mapActions, mapGetters } from "vuex";
import AttendanceProfileList from "../components/AttendanceProfileList.vue";
import UserConstant from "../constants/user";

export default {
  name: "Department",
  components: {
    VueQrReader,
    AttendanceProfileList,
  },
  data: () => ({
    afterScan: null,
    displayIndex: 0,
    userId: null,
    location: null,
    constants: UserConstant,
    loading: false,
    processing: false,
  }),
  computed: {
    ...mapGetters({
      attendances: "attendance/GET_ATTENDANCES",
      currentDepartment: "attendance/GET_CURRENT_DEPARTMENT",
    }),
  },
  methods: {
    ...mapActions({
      fetchAttendance: "attendance/GET_ATTENDANCES",
      setDepartment: "attendance/SET_DEPARTMENT",
      updateLocation: "attendance/UPDATE_LOCATION",
    }),
    codeArrived(userId) {
      const currentTime = new Date().getTime();
      this.userId = userId;
      this.processing = true;
      if (!this.afterScan || currentTime - this.afterScan > 2000) {
        this.updateLocation({
          id: this.userId,
          location: {
            location: this.currentDepartment,
          },
        }).finally(() => {
          console.log("SCANNED: ", userId);
          this.afterScan = currentTime;
          this.processing = false;
        });
      }
    },
  },
  async mounted() {
    this.loading = true;
    await this.fetchAttendance({});
    this.loading = false;
  },
};
</script>
