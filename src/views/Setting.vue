<template>
    <v-card elevation="10" class="mx-5 mt-5 pt-5">
        <div class="d-flex justify-space-between align-center">
            <v-breadcrumbs :items="links">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </div>

        <v-container class="d-flex justify-space-between align-center">
            <p>Current Department </p>
            <v-select clearable v-model="location" :items="constants.departments" item-text="display" item-value="value"
                label="Select" outlined single-line @change="setDepartment" dense style="max-width:500px">
            </v-select>
        </v-container>

    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UserConstant from "../constants/user";
export default {
    name: "Setting",
    data: () => ({
        searchEmployee: "",
        searchAttendance: "",
        searchLog: "",
        tab: null,
        constants: UserConstant,
        userHeaders: [
            {
                text: "Name",
                value: "name",
            },
            {
                text: "Email",
                value: "email",
            },
            {
                text: "Department",
                value: "department",
            },
            {
                text: "Position",
                value: "position",
            },
            {
                text: "User Type",
                value: "type",
            },
            {
                text: "Status",
                value: "status",
            },
        ],
        attendanceHeader: [
            {
                text: "User",
                value: "user.name",
            },
            {
                text: "Signin",
                value: "signin",
            },
            {
                text: "Signout",
                value: "signout",
            },
            {
                text: "Current Location",
                value: "location",
            },
        ],
        logHeader: [
            {
                text: "User",
                value: "user.name",
            },
            {
                text: "Scan At",
                value: "created_at",
            },
            {
                text: "Location",
                value: "location",
            },
        ],
        loading: false,
        location: null,
        links: [
            {
                text: 'ECCEL',
                disabled: false,
                href: '/admin',
            },
            {
                text: 'Settings',
                disabled: true,
            }
        ]
    }),
    computed: {
        ...mapGetters({
            users: "user/GET_USERS",
            attendances: "attendance/GET_ALL",
            logs: "log/GET_LOGS",
            currentDepartment: "attendance/GET_CURRENT_DEPARTMENT",
        }),
    },
    methods: {
        ...mapActions({
            setDepartment: "attendance/SET_DEPARTMENT",
        }),

    },
    async mounted() {

        this.location = this.currentDepartment;
    },
};
</script>
