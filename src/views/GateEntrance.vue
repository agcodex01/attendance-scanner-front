<template>
  <v-container fluid>
    <v-snackbar color="red ligth" v-model="showErorr" :timeout="2000">
      {{ text }}
    </v-snackbar>
    <v-row justify="space-between">
      <v-col cols="2">
        <vue-qr-reader
          v-on:code-scanned="codeArrived"
          :stop-on-scanned="false"
        />
        WebCam Scanned: {{ userId }}
      </v-col>

      <v-col cols="9">
        <v-carousel
          v-model="displayIndex"
          cycle
          wi
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(attendanceChunck, i) in attendances"
            :key="i"
          >
            <attendance-profile-list :attendances="attendanceChunck" />
          </v-carousel-item>
        </v-carousel>
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
    text: null
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
        this.sign(userId).
        catch(error => {
          this.text = error.errors
          this.showErorr = true
          console.log(error);
        });
        console.log("SCANNED: ", userId);
        this.afterScan = currentTime;
        this.userId = userId;
      }
    },
  },
  async mounted() {
    await this.fetchAttendance({});
  },
};
</script>
