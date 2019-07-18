import request from '../utils/request'
//创建试卷
export function CreateExam(params){
    // console.log(params)
    return request.post('/exam/exam',params)
}
//获取事件详情接口
export function getClassPage(){
    return request.get("/exam/questions/new")
}

