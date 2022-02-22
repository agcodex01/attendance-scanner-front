import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

// This assumes you have already saved your bearer token in your browsers local storage
const token = localStorage.getItem('token')
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'websocketkey',
  wsHost: 'localhost',
  authEndpoint: 'http://localhost:8000/broadcasting/auth',
//   encrypted: true,
  forceTLS: false,
//   cluster: 'mt1',
  wsPort: 6001,
  wssPort: 6001,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  auth: {
    headers: {
      authorization: 'Bearer ' + token,
    }
  }
})