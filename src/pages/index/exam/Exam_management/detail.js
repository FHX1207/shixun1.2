import React, { useEffect, useState, Component } from 'react'
import styles from '../css/deatil.scss'
import {connect} from 'dva'
function Tate(props){
   function change(){
    let str=props.location.pathname.split('/')
    let arr=str[3]
       props.detailData(arr)
   }
  useEffect(() => {
    },[])   
    let text=JSON.parse(window.localStorage.getItem('exam')).questions
    return (
        <div className="detailPage">
            <div>
                <h1 onClick={change}>试卷详情</h1>
                <div className="main">
                    {props.paylist.map(item=>
                        <p className="text">
                            <p>{item.exam_name}</p>
                            1:{item.exam_type}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
Tate.propTypes={
}
const mapStateToprops=(state)=>{
    return {
        ...state.paperExam,
        ...state.papers
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        detailData:payload=>{
            dispatch({
                type:"papers/detaiData",
                payload
            })
        }
   }
}
export default connect(mapStateToprops,mapDispatchToProps)((Tate))










