<template>
  <v-container fluid>
    <v-row justify="space-between">
      <v-col cols="2">
        <vue-qr-reader
          v-on:code-scanned="codeArrived"
          :stop-on-scanned="false"
        />
        WebCam Scanned: {{ userId }}
        <v-select
          v-model="location"
          :items="constants.departments"
          item-text="display"
          item-value="value"
          label="Department"
          outlined
          single-line
          @change="setDepartment"
        ></v-select>
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
import UserConstant from '../constants/user';

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
    constants: UserConstant
  }),
  computed: {
    ...mapGetters({
      attendances: "attendance/GET_ATTENDANCES",
      currentDepartment: "attendance/GET_CURRENT_DEPARTMENT"
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
      if (!this.afterScan || currentTime - this.afterScan > 2000) {
        this.updateLocation({ id: this.userId, location: {
          location: this.currentDepartment
        } });
        console.log("SCANNED: ", userId);
        this.afterScan = currentTime;
        
      }
    }

  },
  async mounted() {
    await this.fetchAttendance({});
  },
};
</script>
