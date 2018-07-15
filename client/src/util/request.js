import axios from 'axios'
import Cookies from 'js-cookie'

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  timeout: 15000
})

service.interceptors.request.use(config => {
  if (Cookies.get('token')) {
    config.headers['token'] = Cookies.get('token')
  }
  return config
}, e => {
  console.log(e)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      return false
    } else {
      return res
    }
  }, error => {
    return Promise.reject(error)
  }
)

export default service
