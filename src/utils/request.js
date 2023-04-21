import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken,setToken} from '@/utils/auth'


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
 
// 请求拦截器
service.interceptors.request.use(
  config => {
    if(config.url != "/auth")
    {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response.data
    console.log(response);
    if(res.code)
    {
      return res
    }
    if (res.errno !== 0) {
      return Promise.reject(new Error(res.errmsg || 'Error'))
    } else {
      return res
    }
  },error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service