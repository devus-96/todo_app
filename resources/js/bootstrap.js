import axios from 'axios'
import get from 'lodash/get'
window.axios = axios

window.axios.default.withCredentials = true
window.axios.default.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
}

axios.interceptors.response.use(response => response, async err => {
    const status = get(err, 'response.status')
  
    if (status === 419) {
      // Refresh our session token
      await axios.get('/csrf-token')
  
      // Return a new request using the original request's configuration
      return axios(err.response.config)
    }
  
    return Promise.reject(err)
  })