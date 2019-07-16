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
//添加用户
export function adduser(params){
    return request.post("/user",params)
}
//更新用户信息（用户名，用户密码，用户身份）
export function newuser(params){
    return request.put("/user/user",params)
}
//添加身份
export function identityedit(params){
    return require.get("/user/identity/edit",params)
}