import api from '../plugins/axios'

const LogService = {
    fetchAll:() => {
        return api.get('/activityLogs')
    }
}

export default LogService