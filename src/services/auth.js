import api from "../plugins/axios"

const AuthService = {
    login: (credential) => {
        return api.post('/login', credential)
    },
    logout: () => {
        return api.post('/logout')
    }
}

export default AuthService