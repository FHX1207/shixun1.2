import axios from "axios"
import {getToken} from "./index"
//可复用
const service = axios.create({
  baseURL:"http://127.0.0.1:7001/",
   // withCredentials: true, // 跨域请求时发送 cookies
  timeout:5000
})

service.interceptors.request.use(
  config=>{
     // 判断是否有登陆态
    if (getToken()) {
      // 让每个请求携带authorization
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response=>response.data,
  error=>{
     return Promise.reject(error)
  }
)
export default service