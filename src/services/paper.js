import request from '../utils/request'
export function PaperList(params){
    return request.get("/exam/exam",params)
}
export function detaiData(params){
    return request.get("/exam/exam",params)
}

