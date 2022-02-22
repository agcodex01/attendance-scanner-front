<template>
  <v-container fluid class="mt-5">
    <v-snackbar color="red ligth" v-model="showErorr" :timeout="2000">
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
export default {
  name: "GateEntrance",
  components: {
    VueQrReader,
    AttendanceProfileList,
  },
  data: () => ({
    afterScan: null,
    displayIndex: 0,
    userId: null,
    showErorr: false,
    text: null,
    processing: false,
    loading: false,
  }),
  computed: {
    ...mapGetters({
      attendances: "attendance/GET_ATTENDANCES",
    }),
  },
  methods: {
    ...mapActions({
      fetchAttendance: "attendance/GET_ATTENDANCES",
      sign: "attendance/SIGN",
    }),
    codeArrived(userId) {
      const currentTime = new Date().getTime();
      if (!this.afterScan || currentTime - this.afterScan > 2000) {
        this.processing = true;
        this.sign(userId)
          .catch((error) => {
            this.text = error.errors;
            this.showErorr = true;
            console.log(error);
          })
          .finally(() => {
            console.log("SCANNED: ", userId);
            this.processing = false;
            this.afterScan = currentTime;
            this.userId = userId;
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
