import {apiAuthority} from '../services/index'
export default {
//命名空间
    namespace: 'user',
//模块的状态
    state: {
       authority:[]
    },

//异步操作
    effects: {
      *apiauth({payload},{call,put}){
          let list = yield call(apiAuthority);
          console.log(list)
          yield put({
              type:"getapiauth",
              payload:list.data
          })
      }
    },
//同步操作
    reducers: {
      //展示api接口权限数据
      getapiauth(state,action){
          return {...state,authority:action.payload}
      }
    },

};