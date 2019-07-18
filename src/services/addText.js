import request from '../utils/request'

//获取所有的试题类型
export function getType(){
    return request.get('/exam/getQuestionsType')
}
//添加试题类型
export function addQuestionType(params){
    return request.get("/exam/insertQuestionsType",{params})
}
//获取所有的试题
export function getClassPage(){
    return request.get("/exam/questions/new")
}
//获取课程
export function getsubject(){
    return request.get("/exam/subject")   
}
export function getexamType(){
    return request.get("/exam/examType")   
}
//获取用户信息
export function getuserInfo(){
    return request.get("/user/userInfo")
}
  //获取试题接口
export function addQuestion(params){
    return request.post("/exam/questions",params)
}


