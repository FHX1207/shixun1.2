import {apiAuthority,viewAuthority,identity,userInfo,getuser} from '../services/index'
export default {
//命名空间
    namespace: 'user',
//模块的状态
    state: {
       authority:[],
       viewauth:[],
       listidentity:[],
       listuserInfo:[],
       listuser:[]
    },

//异步操作
    effects: {
      *apiauth({payload},{call,put}){
          let list = yield call(apiAuthority);
          yield put({
              type:"getapiauth",
              payload:list.data
          })
      },
      *viewauth({payload},{call,put}){
         let list= yield call(viewAuthority);
         yield put({
             type:"getviewauth",
             payload:list.data
         })
      },
      *identity({payload},{call,put}){
          let list = yield call(identity);
          yield put({
              type:"getidentity",
              payload:list.data
          })
      },
      *userInfo({payload},{call,put}){
          let list= yield call(userInfo)
          yield put({
              type:"getuserInfo",
              payload:list.data
          })
      },
      *users({payload},{call,put}){
          let list = yield call(getuser)
          console.log(list)
          yield put({
              type:"getusers",
              payload:list.data
          })
      }
    },
//同步操作
    reducers: {
      //展示api接口权限数据
      getapiauth(state,action){
          return {...state,authority:action.payload}
      },
      //获取视图权限数据
      getviewauth(state,action){
          return {...state,viewauth:action.payload}
      },
      //展示身份数据
      getidentity(state,action){
          return {...state,listidentity:action.payload}
      },
      //获取当前用户信息
      getuserInfo(state,action){
          return {...state,listuserInfo:action.payload}
      },
      //展示用户数据
      getusers(state,action){
          return {...state,listuser:action.payload}
      }
    },

};