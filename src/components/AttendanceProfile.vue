<template>
  <v-card elevation="16" class="mx-auto text-center pb-4" max-width="300px">
    <v-avatar color="grey" size="132" class="mt-8 mb-n16">
      <v-img :src="
        attendance.user.avatar || require('@/assets/default_user.png')
      "></v-img>
    </v-avatar>
    <h5 class="text-h5 font-weight-bold" style="margin-top:96px">{{ attendance.user.name }} </h5>
    <v-card-text>
      <h3><strong> Previous:</strong> {{ attendance.prev_location }} </h3>
      <h3><strong> Current: </strong>{{ attendance.location }}</h3>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "AttendanceProfile",
  props: ["attendance"],
};
</script>
