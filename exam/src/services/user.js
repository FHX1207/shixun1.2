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
export function getUser(){
    return request.get("/user/user")
}
//添加用户
export function addUser(params){
    return request.post("/user", params)
}
//更新用户信息（用户名，用户密码，用户身份）
export function newUser(params){
    return request.put("/user/user", params)
}
//添加身份
export function identityEdit(params){
    return request.get("/user/identity/edit", {params})
}
//添加api接口权限
export function addApipower(params){
    return request.get("/user/authorityApi/edit", {params})
}
//添加视图权限
export function authorityView(params){
    return request.get("/user/authorityView/edit", {params})
}
//给身份设定api接口权限
export function setIdentityApi(params){
    return request.post("/user/setIdentityApi", params)
}
//给身份设定视图权限
export function setIdentityView(params){
    return request.post("/user/setIdentityView", params)
}