import {exam,examType,subject,getQuestionsType,condition} from '../services/index'
import {getToken} from "../utils/index"
import {routerRedux} from "dva/router"
export default {
  // 命名空间
  namespace: 'exam',

  // 模块的状态
  state: {
    exam:[],
    examtype:[],
    subject:[],
    questions:[],
    conditionterm:[]
  },
  //订阅
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      //  console.log("dispatch...",dispatch)
      //  console.log("history",history)
      return history.listen(({pathname})=>{
        //判断去的页面是否是登录页
          if(pathname.indexOf("/login")===-1){
            //判断是否有登录态  
            if(!getToken()){
              //没有登陆态
              dispatch(routerRedux.replace({
                pathname:`/login`,
                search:`?redirect=${encodeURIComponent(pathname)}`
              }))
            }
          }else{
            //是登录页
            if(getToken()){
              dispatch(routerRedux.replace({pathname:"/exam"}))
            }
          }
      })
    },
  },
  // 异步操作
  effects: {
    *exam({payload},{call,put}){
      let data= yield call(exam);
      //console.log("exam...",data)
      yield put({
        type:"findexam",
        payload:data.data
      })
    },
    *type({},{call,put}){
      let list = yield call(examType);
      yield put({
        type:"examtype",
        payload:list.data
      })
    },
    *subjecttype({},{call,put}){
      let list = yield call(subject);
      yield put({
        type:"findsubject",
        payload:list.data
      })
    },
    *questionsTypes({},{call,put}){
      let list = yield call(getQuestionsType);
      yield put({
        type:"questionsType",
        payload:list.data
      })
    },
    *term({},{call,put}){
      let list = yield call(condition);
      yield put({
        type:"condition",
        payload:list.data
      })
    }
  },

  // 同步操作
  reducers: {
    findexam(state,action){
      return {...state,exam:action.payload}
    },
    examtype(state,action){
      return {...state,examtype:action.payload}
    },
    findsubject(state,action){
      return {...state,subject:action.payload}
    },
    questionsType(state,action){
      return {...state,questions:action.payload}
    },
    //按条件获取试题
    condition(state,action){
      return {...state,condition:action.payload}
    }
  },

};
