import React, { useEffect, useState, Component } from 'react';
import styles from '../css/addExam.scss';
import {Form,message,Modal,Button,Input,Select,InputNumber,DatePicker} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { stat } from 'fs';
import {connect} from 'dva'
import { NavLink } from 'dva/router';
const { Option} = Select;
function AddExam(props){
    console.log(props)
    useEffect(() => {
        // props.CreateExam()
        props.getexamType()
        props.getsubject()
    },[])
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
                console.log(values)
                  if(!err){
                    props.CreateExam({
                        subject_id:values.subject_id,
                        exam_id:values.exam_id,
                        title:values.titleText,
                        number:values.number * 1,
                        start_time : +values.start_time,
                        end_time :+values.end_time
                    })
                    props.history.push('/exam/edit')
                }
            })
         }
        const {MonthPicker,RangePicker}=DatePicker;
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          }
        return (
            <div className="examPage">
                <Form onSubmit={handleSubmit}>
                <div>
                    <h1>添加考试</h1>
                    <div className="mains">
                        <Form.Item>
                                <p>*试卷名称</p>
                            {getFieldDecorator('titleText', {
                                rules: [{ required: true, message: '名称不能为空!' }],
                            })(
                                <Input style={{ width: 120 }}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                                <p>*选择考试类型</p>
                            {getFieldDecorator('exam_id', {
                                 rules: [{ required: true, message: "题目类型必选" }],
                                //  initialValue: "周考一"
                            })(
                              <Select style={{ width: 120 }}>
                               {props.examList.map(item=><Option key={item.exam_id} values={item.exam_id}>{item.exam_name}</Option>)}
                              </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                              <p>*选择课程</p>
                            {getFieldDecorator('subject_id', {
                                 rules: [{ required: true, message: "题目类型必选" }],
                                //  initialValue: "项目实战"
                            })(
                              <Select style={{ width: 120 }}>
                                    {props.subjects.map(item=><Option key={item.subject_id} values={item.subject_id}>{item.subject_text}</Option>)}
                              </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                              <p>*设置题量</p>
                                {getFieldDecorator("number", {
                                 rules: [{ required: true, message: "题量" },
                                ],
                            })(
                                <InputNumber min={1} max={10} step={3}/>
                            )} 
                        </Form.Item>
                        <Form.Item label="考试时间：">
                        <Form.Item style={{ display: 'inline-block' }}>
                            {getFieldDecorator('start_time', {
                                rules: [{ required: true, message: '请选择开始时间!' }],
                            })(
                                <DatePicker placeholder="开始时间"
                                    format="YYYY-MM-DD HH:mm"
                                    showTime={{ format: 'HH:mm' }}
                                    locale={locale}
                                />
                            )}
                        </Form.Item>
                        <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                        <Form.Item style={{ display: 'inline-block' }}>
                            {getFieldDecorator('end_time', {
                                rules: [{ required: true, message: '请选择结束时间!' }],
                            })(
                                <DatePicker placeholder="结束时间"
                                    format="YYYY-MM-DD HH:mm"
                                    showTime={{ format: 'HH:mm' }}
                                    locale={locale}
                                />
                            )}
                        </Form.Item>
                    </Form.Item>
                    </div>
                </div>
               <div>
            <Button className="btn" type="primary" onClick={showModal} type="primary" size="large">创建试卷</Button>
                <Modal
                        title="Basic Modal"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        >
                        <h2>确认添加吗？</h2>      
                </Modal>
            </div>  
                </Form>
            </div>
        )
   }
    AddExam.propTypes={
    }
    const mapStateToprops=(state)=>{
        return {
            ...state.papers,
            ...state.power,
            ...state.paperExam
        }
    }
    const mapDispatchToProps=(dispatch)=>{
        return {
            CreateExam:payload=>{
                dispatch({
                    type:"papers/CreateExam",
                    payload
                })
            },
            getexamType:()=>{
                dispatch({
                    type:"power/getexamType",
                })
            },
            getsubject:()=>{
                dispatch({
                    type:"power/getsubject",
                })
            },
            detailData:()=>{
                dispatch({
                    type:"paperExam/detaiData"
                })
            }
       }
    }
export default connect(mapStateToprops,mapDispatchToProps)(Form.create()(AddExam))
