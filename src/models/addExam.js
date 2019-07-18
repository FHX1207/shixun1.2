
import {CreateExam} from '../services/addExam'
import {detaiData} from '../services/paper'
import { stat } from 'fs';
export default {
    //命名空间
      namespace: 'papers',
    //模块的状态
      state: {
          addList:0
      },
    //订阅
      subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
      },
    //异步操作
      effects: {
        //添加考试接口
        *CreateExam({ payload }, { call, put }) {  // eslint-disable-line
            let data=yield CreateExam(payload)
            console.log('data...',data)
            window.localStorage.setItem("exam",JSON.stringify(data.data))
            if(data.code===0){
                return
            }else{
                yield put({
                    type:"createList",
                    payload:data.code
                })
            }
        },
        *detaiData({ payload }, { call, put }) {  // eslint-disable-line
          let data=yield detaiData(payload)
          console.log('detail...',data)
              yield put({
                  type:"CreateExam"
         })
      },
      },
 //同步操作
      reducers: {
        createList(state, {payload}) {
          return { ...state, addList:payload };
        }
      }
    }


    