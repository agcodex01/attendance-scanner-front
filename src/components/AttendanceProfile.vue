<template>
  <v-card elevation="6">
    <v-list two-line  class="mb-0" color="#900303">
      <v-list-item class="white--text font-weight-bold">
        <v-list-item-avatar>
          <v-img
            :src="
              attendance.user.avatar || require('@/assets/default_user.png')
            "
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="attendance.user.name"></v-list-item-title>
          <v-list-item-subtitle class="white--text"
            v-text="attendance.user.position.toUpperCase()"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-subtitle class="pb-0 text-center"> Current Location </v-card-subtitle>
    <v-card-text class="text--primary font-weight-bold text-center">
      <div>{{ attendance.location }}</div>
    </v-card-text>
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">Status</div>

      <v-timeline align-top dense>
        <v-timeline-item color="green" small>
          <div>
            <div class="font-weight-normal">
              <strong>Sign In</strong> 
            </div>
            <div>{{ attendance.signin }}</div>
          </div>
        </v-timeline-item>
        <v-timeline-item color="red" small>
          <div>
            <div class="font-weight-normal">
              <strong>Sign Out</strong> 
            </div>
            <div>{{ attendance.signout || '--/--/---- --:-- --' }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AttendanceProfile",
  props: ["attendance"],
};
</script>
