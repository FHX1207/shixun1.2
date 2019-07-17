import React, { useEffect} from 'react'
import {connect} from "dva";
import "../css/examPage.css"
import {Tag} from 'antd';
function detail(props){
    let ids = props.match.params.id;
    let {exam} =props;
    console.log(exam)
    useEffect(()=>{
        props.getQuestion()
     },[])
    let question= exam.filter((file)=>file.questions_id===ids)[0] ||[];
    return (
        <div className="detailexam">
            <h2>试题详情</h2>
            <div className="detail">
               <div className="title detail_question">
                  <div>出题人：{question.user_name}</div>
                  <h3>题目信息</h3>
                  <div className="labels">
                    <Tag color="gold">{question.questions_type_text}</Tag>
                    <Tag color="lime">{question.subject_text}</Tag>
                    <Tag color="green">{question.exam_name}</Tag>
                  </div>
                  <h4>{question.title}</h4>
                  <div>{question.questions_stem}</div>
               </div>
               <div className="title detail_answers">
                  <h3>答案信息</h3>
                  {question.questions_answer}
               </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        ...state.exam 
    }
 }
const mapDispatchToProps = dispatch => {
    return {
      //获取所有的试题
       getQuestion: () => {
           dispatch({
               type:"exam/exam",
           })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(detail)