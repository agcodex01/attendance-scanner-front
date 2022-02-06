<template>
  <v-row>
    <v-col cols="3">
      <h1>Qr Scanner</h1>
      <vue-qr-reader
        v-on:code-scanned="codeArrived"
        :error-captured="errorCaptured"
        :stop-on-scanned="false"
        :responsive="true"
      />
    </v-col>
    <v-col cols="9" style="background-color: red">
      <attendance-profile-list></attendance-profile-list>
    </v-col>
  </v-row>
</template>

<script>
import AttendanceProfileList from "./AttendanceProfileList.vue";
import VueQrReader from "vue-qr-reader/dist/lib/vue-qr-reader.umd.js";
export default {
  name: "ScanPage",
  components: {
    AttendanceProfileList,
    VueQrReader,
  },
  data: () => ({
      afterScan: null,
  }),
  methods: {
    codeArrived(code) {
        let currentTime = new Date().getTime();
      if(!this.afterScan || (currentTime - this.afterScan) > 2000) {
          console.log(code);
          this.afterScan = currentTime
      }
    },
    errorCaptured(error) {
      switch (error.name) {
        case "NotAllowedError":
          this.errorMessage = "Camera permission denied.";
          break;
        case "NotFoundError":
          this.errorMessage = "There is no connected camera.";
          break;
        case "NotSupportedError":
          this.errorMessage =
            "Seems like this page is served in non-secure context.";
          break;
        case "NotReadableError":
          this.errorMessage =
            "Couldn't access your camera. Is it already in use?";
          break;
        case "OverconstrainedError":
          this.errorMessage = "Constraints don't match any installed camera.";
          break;
        default:
          this.errorMessage = "UNKNOWN ERROR: " + error.message;
      }
      console.error(this.errorMessage);
    },
  },
};
</script>
