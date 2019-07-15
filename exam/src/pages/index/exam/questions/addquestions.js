import React, { useEffect } from 'react'
import {connect} from 'dva'
import Editor from 'for-editor'
//import { Router, Route, Switch ,Redirect} from 'dva/router';
import "../css/examPage.css"
import { Input ,Form,Button, Select} from 'antd';


//const { Option} = Select;
function AddQuestion(props) {
    console.log(props)

    useEffect(() => {
        props.getQuestionTypes()
        props.getsubject()
        props.Allquestion()
      }, [])

  const {getFieldDecorator}=props.form;

 return (
       <Form className="login-form">
            <div className="addPage">
                <h4>添加试题</h4>
                
                <div className="mains">
                <div>
                    <p>题目信息</p>
                    <Form.Item>
                        <p>题干</p>
                                {getFieldDecorator('titleText', {
                                    rules: [{ required: true, message: '标题不能为空!' }],
                                })(
                                    <Input
                                    placeholder="请输入题目标题，不能超过20字"
                                    />,
                                )}
                    </Form.Item>
                </div>
               <div className="themList">
                   <p>题目主题</p>
                  <div className="editfor">
                    <Form.Item>
                                {getFieldDecorator('value', {
                                    rules: [{ required: true, message: "答案信息必填" }],
                                    initialValue: '',
                                })(
                                    <Editor height='auto'/>
                                )}
                    </Form.Item>
                  </div>
                  <div className="themList">
                         <p>请选择考试类型：</p>
                         {/* <Form.Item>
                                {getFieldDecorator('exam_id', {
                                    rules: [{ required: true, message: "题目类型必选" }],
                                    initialValue: "请选择题目类型"
                                })(
                                <Select style={{ width: 120 }} initialValue="简答题">
                                   {props.TypeList.map(item=><Option key={item.questions_type_id} value={item.questions_type_text}>{item.questions_type_text}</Option>)}
                                </Select>
                                )}
                        </Form.Item> */}
                  </div>
                  <div className="themList">   
              <p>请选择课程类型：</p>
                     {/* <Form.Item>
                        {getFieldDecorator('subject_id', {
                            rules: [{ required: true, message: "题目类型必选" }],
                            initialValue: "请选择题目类型"
                        })(
                            <Select  style={{ width: 120 }}>
                           {props.subjects.map(item=><Option key={item.subject_id} value={item.subject_text}>{item.subject_text}</Option>)}
                            </Select>
                        )}
                        </Form.Item> */}
       </div>
       <div className="themList">     
              <p>请选择题目类型：</p>
              {/* <Form.Item>
                    {getFieldDecorator('questions_type_id', {
                        rules: [{ required: true, message: "题目类型必选" }],
                        initialValue: "简答题"
                    })(
                        <Select  style={{ width: 120 }}>
                           {props.insertList.map(item=><Option key={item.questions_type_id} value={item.questions_type_text}>{item.questions_type_text}</Option>)}
                        </Select>
                    )}
             </Form.Item> */}
       </div>
                 <p>答案信息</p>
                 {/* <Form.Item>
                            {getFieldDecorator('valueowen', {
                                rules: [{ required: true, message: "答案信息必填" }],
                                initialValue: '',
                            })(
                                <Editor height='auto'/>
                            )}
                 </Form.Item> */}
            <div>
            <Button type="primary" htmlType="submit" >提交</Button>
            </div> 
               </div>
                </div>
            </div>
            </Form>
        )
}

const mapStateToProps=(state)=>{
    console.log(state)
    return {
        // ...state.power
        ...state.exam 
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        //获取所有的试题类型
        getQuestionTypes:()=>{
            dispatch({
                // type:"power/type"
                type:"exam/questionsTypes"
            })
        },
       //获取所有的课程
        getsubject:()=>{
            dispatch({
                // type:"power/getsubject"
                type:"exam/subjecttype"
            })
        },
         //获取所有的试题
        Allquestion:()=>{
            dispatch({
                // type:"power/Allquestion"
                type:"exam/exam"
            })
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddQuestion))
