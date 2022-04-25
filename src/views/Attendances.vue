<template>
    <v-card elevation="10" class="mx-5 mt-5 pt-5">
        <div class="d-flex justify-space-between align-center">
            <v-breadcrumbs :items="links">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </div>
        <v-card flat>
            <v-card-title>
                Attendances
                <v-spacer></v-spacer>
                <v-text-field v-model="searchAttendance" append-icon="mdi-magnify" label="Search" single-line
                    hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="attendanceHeader" :items="attendances" :items-per-page="5"
                :search="searchAttendance" class="elevation-1" loading-text="Fetching attendances.." :loading="loading">
            </v-data-table>
        </v-card>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UserConstant from "../constants/user";
export default {
    name: "Admin",
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
                text: 'Attendances',
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
            fetchUsers: "user/GET_USERS",
            fetchAttendances: "attendance/GET_ALL",
            fetchLogs: "log/GET_LOGS",
            setDepartment: "attendance/SET_DEPARTMENT",
        }),
        async fetchUsersFn() {
            this.loading = true;
            await this.fetchAttendances();
            this.loading = false;
        },
        async fetchAttendancesFn() {
            this.loading = true;
            await this.fetchAttendances();
            this.loading = false;
        },
        async fetchLogsFn() {
            this.loading = true;
            await this.fetchLogs();
            this.loading = false;
        },
        getDisplayPosition(position_value) {
            return this.constants.positions.find(x => x.value == position_value).display
        }
    },
    async mounted() {
        this.loading = true;
        this.location = this.currentDepartment;
        await this.fetchAttendances();
        this.loading = false;
    },
};
</script>
