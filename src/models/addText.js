import {
    getType,
    getClassPage,
    getsubject,
    addQuestionType,
    getexamType,
    getuserInfo,
    addQuestion
 } from '../services/addText.js'
import { stat } from 'fs';
import { isBuffer } from 'util';
 
 //import { routerRedux } from 'dva/router'
//  console.log(getType)
 export default {
     //命名空间
     namespace: 'power',
     //模块状态
     state: {
         TypeList: [],
         subjects:[],
         ViewList: [],
         examList:[],
         addInfo:0
     },

     //订阅
     // subscriptions: {
     //     setup({ dispatch, history }) {  // eslint-disable-line
     //     },
     // },

     //异步操作
     effects: {
         // 获取所有的试题
         *getClassPage({ payload}, { call, put }) {
             let data=yield call(getClassPage)
             console.log('getClassPage',data)
             yield put({
                 type:"getData",
                 payload:data.data
             })
          },

          *getsubject({payload},{call,put}){
              let data=yield call(getsubject)
              console.log('getsubject',data)
              yield put({
                  type:"subject",
                  payload:data.data
              })
          },

         //全部试题类型
        *addQuestionType({payload},{call,put}){
            console.log('payload...',payload)
            let data=yield addQuestionType(payload);
            console.log('data...',data)
           if(data.code==1){
            yield put({
                type:"type"
            })
           }
        },

         // 获取所有试题类型  简答题  
         *type({payload}, { call, put }) {
            let data = yield call(getType)
            yield put({
                type: "typeUpdata",
                payload: data.data
            })
        },

        *getexamType({payload},{call,put}){
            let data=yield call(getexamType)
            yield put({
                type:"examType",
                payload:data.data
            })
        },

        *getuserInfo({payload},{call,put}){
            let data=yield call(getuserInfo)
            yield put({
                type:"user",
                payload:data.data
            })
        },

        *addQuestion({payload},{call,put}){
            let data=yield addQuestion(payload)
            if(data.code===0){
                return
            }else{
                yield put({
                    type:"upQuestion",
                    payload:data.code
                })
            }
        }
     },

     //同步操作
     reducers: {
        //获取所有试题类型
         typeUpdata(state, { payload }) {
             return { ...state, TypeList: payload }
         },
         getData(state,{payload}){
             return {...state,ViewList:payload}
         },
         subject(state,{payload}){
             return {...state,subjects:payload}
         },
            //添加试题类型
        //  typeUpdata(state,payload){
        //      return {...state,addList:payload}
        //  }
        examType(state,{payload}){
            return {...state,examList:payload}
        },
        user(state,{payload}){
            return {...state,typeUser:payload}
        },
        //post添加试题接口
        upQuestion(state,{payload}){
            return {...state,addInfo:payload}
        }
     }
 };
 