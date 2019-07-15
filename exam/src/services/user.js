import request from "../utils/request";
//展示api接口权限数据
export function apiAuthority (){
    return request.get("/user/api_authority")
}