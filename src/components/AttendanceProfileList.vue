<template>
  <v-row justify="space-around" align="center" class=" pb-10 px-10">
    <v-col cols="4" v-for="(attendance, index) in attendances" :key="index">
      <attendance-profile :attendance="attendance" />
    </v-col>
  </v-row>
</template>
<script>
import AttendanceProfile from "./AttendanceProfile.vue";
export default {
  components: { AttendanceProfile },
  name: "AttendanceProfileList",
  props: ["attendances"],
};
</script>
