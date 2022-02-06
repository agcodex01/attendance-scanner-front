<template>
  <v-sheet height="100%">
    <v-row justify="center" align="center">
      <v-col cols="4" v-for="(attendance, index) in attendances" :key="index">
        <attendance-profile :attendance="attendance" />
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script>
import AttendanceProfile from "./AttendanceProfile.vue";
export default {
  components: { AttendanceProfile },
  name: "AttendanceProfileList",
  props: ['attendances']
};
</script>
