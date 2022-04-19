<template>
  <v-container fluid>
    <v-snackbar  :color="type" v-model="showNotif" :timeout="3000">
      {{ text }}
    </v-snackbar>
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
          <h3>{{ currentDepartment || 'No department selected.' }}</h3> 
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
    showNotif: false,
    type: 'green',
    text: null
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
      if (
        !this.afterScan ||
        (currentTime - this.afterScan > 5000 && !this.processing && userId)
      ) {
        this.processing = true;
        this.updateLocation({
          id: userId,
          location: {
            location: this.currentDepartment,
          },
        }).then((attendance) => {
          this.showNotif = true
          this.text = `${attendance.user.name} sign In successfully.`
        })
        .catch((error) => {
            console.log(error);
            this.text = error.errors;
            this.type = "red";
            this.showNotif = true;
          })
        .finally(() => {
          console.log("SCANNED: ", userId);
          this.processing = false;
          this.userId = userId;
        });

        this.afterScan = currentTime;
      }
    },
  },
  async mounted() {
    this.$store.dispatch(
      "auth/SET_SHOW_ICON",
      true
    );
    this.loading = true;
    window.Echo.channel("signin").listen("NewSignIN", (e) => {
      console.log("test successful " + e);
    });
    await this.fetchAttendance({});
    this.loading = false;
  },
};
</script>
