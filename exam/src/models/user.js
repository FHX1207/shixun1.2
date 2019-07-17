import {
    apiAuthority,
    viewAuthority,
    identity,
    userInfo,
    getuser,
    adduser,
    newuser,
    identityedit,
    addapipower
} from '../services/index'

export default {
//命名空间
    namespace: 'user',
//模块的状态
    state: {
       authority:[],
       viewauth:[],
       listidentity:[],
       listuserInfo:[],
       listuser:[],
       adduser:[],
       newUser:[],
       editidentity:[],
       addapiauth:[]
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
          yield put({
              type:"getusers",
              payload:list.data
          })
      },
      *addusers({payload},{call,put}){
          let list =yield call(adduser,payload)
          yield put({
              type:"getadduser",
              payload:list
          })
      },
      *newUpdate({payload},{call,put}){
          let list=yield call(newuser,payload)
        //   console.log(list)
          yield put({
              type:"updateuser",
              payload:list
          })
      },
      *addedit({payload},{call,put}){
          console.log(payload)
          let list= yield call(identityedit,payload)
          console.log(list)
          yield put({
              type:"addidentity",
              payload:list
          })
      },
      *addapi({payload},{call,put}){
          console.log(payload)
          let list = yield call(addapipower,payload)
          console.log(list)
          yield put({
              type:"addapiedit",
              payload:list
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
      },
      //添加用户
      getadduser(state,action){
          return {...state,adduser:action.payload}
      },
      //更新用户信息（用户名，用户密码，用户身份）
      updateuser(state,action){
          return {...state,newUser:action.payload}
      },
      //添加身份
      addidentity(state,action){
          return {...state,editidentity:action.payload}
      },
      //添加api接口权限
      addapiedit(state,action){
          return {...state,addapiauth:action.payload}
      }
    },

};