import request from "../utils/request";
//展示api接口权限数据
export function apiAuthority (){
    return request.get("/user/api_authority")
}
//获取视图权限数据
export function viewAuthority(){
    return request.get("/user/view_authority")
}
//展示身份数据
export function identity(){
    return request.get("/user/identity")
}
//获取当前用户信息
export function userInfo(){
    return request.get("/user/userInfo")
}
//展示用户数据
export function getuser(){
    return request.get("/user/user")
}