import api from "../plugins/axios"

const AttendanceService = {
    sign: (userId) => {
        return api.post(`/users/${userId}/attendances/sign`)
    },
    getAttendances: (filter) => {
        return api.get('/attendances', {
            params: filter
        })
    },
    all: (filter) => {
        return api.get('/attendances/all', {
            params: filter
        })
    },
    updateLocation: (id, location) => {
        return api.put(`/users/${id}/attendances/updateLocation`, location)
    }
}

export default AttendanceService