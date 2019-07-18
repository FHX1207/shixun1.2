import {PaperList,detaiData} from '../services/paper'
export default {
  //命名空间
    namespace: 'paperExam',
  //模块的状态
    state: {
      paylist:[],
      detailList:[]
    },
  //订阅
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  //异步操作
    effects: {
      *PaperList({ payload }, { call, put }) {  // eslint-disable-line
          let data=yield PaperList(payload)
          console.log('data...',data.exam)
              yield put({
                  type:"payPage",
                  payload:data.exam
         })
      },
      //获取试卷详情页面
      *detaiData({ payload }, { call, put }) {  // eslint-disable-line
        let data=yield detaiData(payload)
        console.log('detail...',data)
            yield put({
                type:"PaperList"
               
       })
    },
    },
     //同步操作
    reducers: {
      payPage(state, {payload}) {
        return { ...state, paylist:payload };
      },
       //获取试卷详情页面
      // detailPage(state,{payload}){
      //   return {...state,detailList:payload}
      // }
    },
    };


    