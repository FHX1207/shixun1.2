import {login,userInfo} from '../services/index'
import {setToken,getToken} from "../utils/index"
import {routerRedux} from "dva/router"
export default {
  // 命名空间
  namespace: 'login',

  // 模块的状态
  state: {
    isLogin: -1,
    listuserInfo:[]
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
          if(getToken()){
            dispatch({
              type: "login/userInfo"
            });
          }
      })
    },
  },
  // 异步操作
  effects: {
    *login({ payload }, {call, put}){
     // console.log('payload...', payload)
      let data = yield call(login, payload);
      console.log('data...', data);
      if(data.code===1){
        setToken(data.token)
      }
      // 调用reduce改变登陆状态
      yield put({
        type: 'updateLogin',
        payload: data.code
      })
    },
    *userInfo({payload},{call,put}){
      let list= yield call(userInfo)
      yield put({
          type:"getuserInfo",
          payload:list.data
      })
  },
  },

  // 同步操作
  reducers: {
    updateLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },
    //获取当前用户信息
    getuserInfo(state,action){
      return {...state,listuserInfo:action.payload}
  },
  },

};
