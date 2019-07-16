import React, { useEffect,useState } from 'react'
import {connect} from "dva";
import "../css/examPage.css"
import { Select,Button,Tag} from 'antd';

const { Option } = Select;

function checkquestion(props) {
    let {exam,examtype,subject,questions,conditionterm}=props;
    if(conditionterm.length!==0){
        exam=conditionterm
    }
    useEffect(()=>{
       props.getQuestion();
       props.getExamType();
       props.getsubject();
       props.getQuestionsType();
       props.condition();
    },[])
        //考试类型：
    const [seleValue, setSeleValue] = useState("");
    //题目类型
    const [seleTypeValue, setseleTypeValue] = useState("");
    //课程类型
    const [typeData, setTypeData] = useState("");
    let seleFn = dls => {
       // console.log("考试类型"+dls)
        setSeleValue(dls);
    };
    let typeFn = dls => {
       // console.log("题目类型"+dls)
        setseleTypeValue(dls);
    };            
    let s = "";
    let lisFn = e => {
        s = e.target.getAttribute("datakey");
        setTypeData(s);
    };
 
  //点击按钮
    let findquestion=()=>{
        props.condition().title({
            questions_type_id: seleTypeValue,
            exam_id: seleValue,
            subject_id: typeData
        })
    }
    let subjectdelog=(subject)=>{
        let {history}=props;
        history.push({pathname:`/exam/details/${subject}`})
    }
    let editQuestion=(exam)=>{
       let {history}=props;
       history.push({pathname:`/exam/editexam/${exam}`})
    }
    return (
        <div className="seequest">
            <h2>查看试题</h2>
            <div className="navquest">
                <div className="course">
                    <div className="coursetype">课程类型：</div>
                    <div className="listcourse">
                        <span onClick={lisFn}>All</span>
                        {subject.map(item=><span key={item.subject_id} datakey={item.subject_id} onClick={lisFn}>  {item.subject_text}</span>)}
                    </div>
                </div>
                <div className="other">
                    <div className="othertype">
                    <span>考试类型：</span>
                        <Select defaultValue="周考一" style={{ width: 120 }} >
                        {examtype&&examtype.map((item)=><Option  onClick={()=>seleFn(item.exam_id)} value={item.exam_name} key={item.exam_id}>{item.exam_name}</Option>)}
                        </Select>
                    </div>
                    <div className="othertype">
                    <span>题目类型：</span>
                        <Select defaultValue="简答题" style={{ width: 120 }} >
                        {questions&&questions.map(item=><Option  onClick={()=>typeFn(item.questions_type_id)} value={item.questions_type_text} key={item.questions_type_id}>{item.questions_type_text}</Option>)}
                        </Select>
                    </div>
                    <Button type="primary" icon="search" onClick={()=>{findquestion()}}>查询</Button>
                </div>
            </div>
            <div className="listquest">
                {conditionterm.length===0?"全部查询结果":""}
                {exam&&exam.map((item,index)=>
                    <div className="subject" key={index}>
                        <div className="listsubject" onClick={()=>subjectdelog(item.questions_id)}>
                            <h4>{item.title}</h4>
                            <div className="labels">
                                <Tag color="gold">{item.questions_type_text}</Tag>
                                <Tag color="lime">{item.subject_text}</Tag>
                                <Tag color="green">{item.exam_name}</Tag>
                            </div>
                            <div className="usesubject">{item.user_name}发布</div>
                        </div>
                        <div className="edit" onClick={()=>editQuestion(item.questions_id)}>编辑</div>
                    </div>
                )}
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
        },
      //获取所有的考试类型
      getExamType:()=>{
          dispatch({
              type:"exam/type"
          })
      },
      //获取所有的课程
      getsubject:()=>{
          dispatch({
              type:"exam/subjecttype"
          })
      },
      //获取所有的试题类型
      getQuestionsType:()=>{
          dispatch({
              type:"exam/questionsTypes"
          })
      },
      //按条件获取试题
      condition:()=>{
        return {
            title:payload=>{
                dispatch({
                    type:"exam/term",
                    payload
                })
            }
        }
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(checkquestion)