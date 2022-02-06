<template>
  <v-card elevation="6">
    <v-list two-line>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="attendance.user.avatar || require('@/assets/default_user.png')"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="attendance.user.name"></v-list-item-title>
          <v-list-item-subtitle
            v-text="attendance.user.department"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-subtitle class="mb-0 pb-0 text-h6">
      Location: {{ attendance.location }}
    </v-card-subtitle>
    <v-card-actions class="mt-0 pt-0">
      <v-btn class="ml-2 my-2" outlined rounded small>
        Sign In: {{ attendance.signin }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AttendanceProfile",
  props: ["attendance"],
};
</script>
