import request from "../utils/request";
//登录
export function login (params){
    return request.post("/user/login",params)
}
//获取所有的试题
export function exam (){
    return request.get("/exam/questions/new")
}
//获取所有的考试类型
export function examType(){
    return request.get("/exam/examType")
}
//获取所有的课程
export function subject(){
    return request.get("/exam/subject")
}
//获取所有的试题类型
export function getQuestionsType(){
    return request.get("/exam/getQuestionsType")
}
//按条件获取试题
export function condition(params){
    return request.get("/exam/questions/condition",params)
}