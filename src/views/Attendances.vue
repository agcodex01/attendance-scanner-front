<template>
    <v-card elevation="10" class="mx-5 mt-5 pt-5">
        <div class="d-flex justify-space-between align-center">
            <v-breadcrumbs :items="links">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </div>
        <v-card-title>
            Filters
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="3">
                    <v-select v-model="selectedUsers" multiple :items="users" item-text="name" item-value="id" key="id"
                        label="User" outlined dense class="col-3">
                        <template v-slot:prepend-item>
                            <v-list-item ripple @mousedown.prevent @click="toggle">
                                <v-list-item-action>
                                    <v-icon :color="selectedUsers.length > 0 ? 'indigo darken-4' : ''">
                                        {{ icon }}
                                    </v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        Select All
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>
                    </v-select>

                </v-col>
                <v-col cols="3">
                    <v-text-field type="datetime-local" label="From" v-model="filter.createdFrom" outlined dense
                        class="col-3"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field type="datetime-local" v-model="filter.createdTo" label="To" outlined dense cols="3">
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-btn outlined color="primary" @click="applyFilter">
                        apply
                    </v-btn>
                </v-col>
            </v-row>

        </v-card-text>

        <v-card flat>
            <v-card-title>
                Attendances
                <v-spacer></v-spacer>
                <v-text-field v-model="searchAttendance" outlined dense append-icon="mdi-magnify" label="Search"
                    single-line hide-details style="max-width:500px">
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
        attendanceHeader: [
            {
                text: "User",
                value: "user.name",
            },
            {
                text: "Scan In",
                value: "signin",
            },
            {
                text: "Scan Out",
                value: "signout",
            },
            {
                text: "Current Location",
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
        ],
        selectedUsers: [],
        filter: {
            userIds: [],
            createdFrom: null,
            createdTo: null
        }
    }),
    computed: {
        ...mapGetters({
            users: "user/GET_USERS",
            attendances: "attendance/GET_ALL",
            currentDepartment: "attendance/GET_CURRENT_DEPARTMENT",
        }),
        icon() {
            if (this.selectAllUser) return 'mdi-close-box'
            if (this.selectsSomeUser) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
        selectAllUser() {
            return this.selectedUsers.length === this.users.length
        },
        selectsSomeUser() {
            return this.selectedUsers.length > 0 && !this.selectAllUser
        }
    },
    methods: {
        ...mapActions({
            fetchUsers: "user/GET_USERS",
            fetchAttendances: "attendance/GET_ALL",
        }),
        async fetchAttendancesFn() {
            this.loading = true;
            await this.fetchAttendances();
            this.loading = false;
        },
        toggle() {
            this.$nextTick(() => {
                console.log(this.users);
                if (this.selectAllUser) {
                    this.selectedUsers = []
                } else {
                    this.selectedUsers = this.users.slice()
                }
                console.log(this.selectedUsers);
            })
        },
        async applyFilter() {
            this.filter.userIds = this.selectedUsers.map((u) => {
                if (typeof (u) == 'object') {
                    return u.id
                }
                return u
            })
            await this.fetchAttendances(this.filter)
        }
    },
    async mounted() {
        this.loading = true;
        this.location = this.currentDepartment;
        await this.fetchAttendances({});
        await this.fetchUsers({})
        this.loading = false;
    },
};
</script>
