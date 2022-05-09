import api from '../plugins/axios'

const LogService = {
    fetchAll:(filter) => {
        return api.get('/activityLogs', {
            params: filter
        })
    }
}

export default LogService