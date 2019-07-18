import {
    apiAuthority,
    viewAuthority,
    identity,
    userInfo,
    getUser,
    addUser,
    newUser,
    identityEdit,
    addApipower,
    authorityView,
    setIdentityApi,
    setIdentityView
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
       addUser:[],
       newUser:[],
       editidentity:[],
       addapiauth:[],
       viewPower:[],
       Jurisdiction:[],
       statusView:[]
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
          let list = yield call(getUser)
          yield put({
              type:"getusers",
              payload:list.data
          })
      },
      *addusers({payload},{call,put}){
          let list =yield call(addUser,payload)
          yield put({
              type:"getadduser",
              payload:list
          })
      },
      *newUpdate({payload},{call,put}){
          let list=yield call(newUser,payload)
          yield put({
              type:"updateuser",
              payload:list
          })
      },
      *addedit({payload},{call,put}){
          let list= yield call(identityEdit,payload)
          yield put({
              type:"addidentity",
              payload:list
          })
      },
      *addapi({payload},{call,put}){
          let list = yield call(addApipower,payload)
          yield put({
              type:"addapiEdit",
              payload:list
          })
      },
      *addview({payload},{call,put}){
          let list = yield call(authorityView,payload)
          yield put({
              type:"addviewPower",
              payload:list
          })
      },
      *apiJurisdiction({payload},{call,put}){
          let list = yield call( setIdentityApi,payload)
          yield put({
              type:"apiPower",
              payload:list
          })
      },
      *setStatusView({payload},{call,put}){
        console.log(payload)
        let list = yield call( setIdentityView,payload)
        yield put({
            type:"setViewPowr",
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
          return {...state,addUser:action.payload}
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
      addapiEdit(state,action){
          return {...state,addapiauth:action.payload}
      },
      //添加视图权限
      addviewPower(state,action){
         return {...state,viewPower:action.payload}
      },
      //给身份设定api接口权限
      apiPower(state,action){
          return {...state,Jurisdiction:action.payload}
      },
      //给身份设定视图权限
      setViewPowr(state,action){
          return {...state,statusView:action.payload}
      }
    },

};