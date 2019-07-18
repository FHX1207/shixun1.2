import React, { useEffect, useState,Component } from 'react'
import {connect} from 'dva'
import Editor from 'for-editor'
import { Router, Route, Switch ,Redirect} from 'dva/router';
import styles from '../css/addQuestion.scss';
import { Input ,Form, Layout, Menu,Button, Icon ,Select,Modal,message,Spin} from 'antd';
import axios from 'axios'
const { Option} = Select;
    
function AddQuestion(props) {
    console.log(props.addInfo)
    if(props.addInfo==1){
        message.success('添加成功')
    }

    console.log(props)
    useEffect(() => {
        props.getQuestionTypes()
        props.getsubject()
        props.type()
        props.getexamType()
        props.getuserInfo()
      }, [])

//改变状态。    
const [visible,unvisible]=useState(false)
const {getFieldDecorator}=props.form;
const { validateFields } =props.form;
let showModal=()=>{
    unvisible(true)
}

let handleOk=()=>{
    unvisible(false)
    handleSubmit()
}

let handleCancel=()=>{
    unvisible(false)
}

let handleSubmit=()=>{
    validateFields((err, values) => {
          if(!err){
            values.user_id=props.typeUser.user_id;
            props.addQuestion({
                'questions_type_id':values.questions_type_id,
                'subject_id':values.subject_id,
                'exam_id':values.exam_id,
                'title':values.titleText,
                'questions_answer':values.valueowen,
                'user_id':values.user_id,
                'questions_stem':values.value
            })
        }
    })
 }

 return (
     <>
       <Form onSubmit={handleSubmit}>
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
                         <Form.Item>
                                {getFieldDecorator('exam_id', {
                                    rules: [{ required: true, message: "题目类型必选" }],
                                    initialValue: "周考一"
                                })(
                                <Select style={{ width: 120 }}>
                                  {props.examList.map((item,index)=><Option key={item.exam_id}>{item.exam_name}</Option>)}
                                </Select>
                                )}
                        </Form.Item>
                  </div>

         <div className="themList">   
              <p>请选择课程类型：</p>
                     <Form.Item>
                        {getFieldDecorator('subject_id', {
                            rules: [{ required: true, message: "题目类型必选" }],
                            initialValue: "项目实战"
                        })(
                            <Select  style={{ width: 120 }}>
                           {props.subjects.map(item=><Option key={item.subject_id} >{item.subject_text}</Option>)}
                            </Select>
                        )}
                    </Form.Item>
       </div>
       <div className="themList">     
              <p>请选择题目类型：</p>
              <Form.Item>
                    {getFieldDecorator('questions_type_id', {
                        rules: [{ required: true, message: "题目类型必选" }],
                        initialValue: "简答题"
                    })(
                        <Select  style={{ width: 120 }}>
                       {props.TypeList.map(item=><Option key={item.questions_type_id} value={item.questions_type_text}>{item.questions_type_text}</Option>)}
                        </Select>
                    )}
             </Form.Item>
             
       </div>
                 <p>答案信息</p>
                 <Form.Item>
                        {getFieldDecorator('valueowen', {
                            rules: [{ required: true, message: "答案信息必填" }],
                            initialValue: '',
                        })(
                            <Editor height='auto'/>
                        )}
                 </Form.Item>
            <div>
            <Button type="primary" onClick={showModal} type="primary" size="large">
            提示
        </Button>
                <Modal
                        title="Basic Modal"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        >
                        <h2>确认添加吗？</h2>
                </Modal>
            </div> 
            </div>
                </div>
            </div>
            </Form>
             {props.global?<div className={styles.loading}><Spin/></div>:null}
             </>
        )
}

AddQuestion.propTypes={
}
const mapStateToProps=(state)=>{
    return {
        ...state.power
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        getQuestionTypes:()=>{
            dispatch({
                type:"power/type"
            })
        },
        getuserInfo:()=>{
            dispatch({
                type:"power/getuserInfo"
            })
        },
        getsubject:()=>{
            dispatch({
                type:"power/getsubject"
            })
        },
        type:()=>{
            dispatch({
                type:"power/type"
            })
        },
        getexamType:()=>{
            dispatch({
                type:"power/getexamType"
            })
        },
        addQuestion:payload=>{
            dispatch({
                type:"power/addQuestion",
                payload
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(AddQuestion))
