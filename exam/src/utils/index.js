import Cookies from 'js-cookie'
const key ="preservation"
//设置cookie ,过期时间为十个小时
export function setToken(val){
  console.log(val)
  let date = new Date();//当前时间
  let period = date.getTime()+10*60*60*1000;//十小时后的时间戳
  date.setTime(period)
  Cookies.set(key,val,{period:date})
}
//读取cookie
export function getToken(){
  return Cookies.get(key)
}
//删除cookie
export function removeToken(){
  Cookies.remove(key)
}