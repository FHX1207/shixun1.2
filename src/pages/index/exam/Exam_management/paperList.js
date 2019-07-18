import React, { useEffect, useState, Component } from 'react'
import {connect} from 'dva'
import styles from '../css/paper.scss';
import moment from 'moment';
import {Form,message,Modal,Button,Input,Select,InputNumber,DatePicker,Table,Divider,Tag} from 'antd';
const { Option} = Select;
function Paperlist(props){
    useEffect(() => {
        props.getexamType()
        props.getsubject()
        props.PaperList()  
        props.detaiData(props.
},[])
const [visible,unvisible]=useState(false)
const {getFieldDecorator}=props.form;
const { validateFields } =props.form;
let text=JSON.parse(window.localStorage.getItem('exam'))
console.log(text)
const columns = [
    {
      title: '试卷信息',
      dataIndex: '',
      key: '',
      render: text => {
        let time = moment(text.end_time - text.start_time);
        return (
          <div>
            <h5>{text.title}</h5>
            <p style={{ fontSize: "12px" }}><span style={{ marginRight: '10px' }}>考试时间:{time.hours()}:
               {time.minutes()}:{time.second()} </span>{text.number}道题<span></span><span>题作弊{text.status}分</span>
            </p>
          </div>
        )
      },
    },{
      title: '班级',
      render: text => <div>
        <h5>考试班级</h5>
        <p style={{ fontSize: "12px" }}>{text.grade_name.join(' ')}</p>
      </div>,
    },{
      title: '创建人',
      dataIndex: 'user_name',
      key: 'address1',
    },{
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'address2',
      render: text => <span style={{ fontSize: '12px' }}>{new Date(text * 1).toLocaleString()}</span>
    },{
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'address3',
      render: text => <span style={{ fontSize: '12px' }}>{new Date(text * 1).toLocaleString()}</span>
    },{
      title: '操作',
      key: 'action',
      render: text => (
        <span>
          <a href="javascript:;" onClick={() => { props.history.push(`/exam/detail/${text.exam_exam_id}`)}}>详情</a>
        </span>
      ),
    },
  ];
 return (
<div className="paperPage">
<Form>
        <div><h1>试卷列表</h1></div>
        <div className="paperTitle">
  <Form.Item>
        <p>*选择考试类型</p>
     {getFieldDecorator('exam_id', {
            rules: [{ required: true, message: "题目类型必选" }],
            initialValue: "周考一"
     })(
        <Select style={{ width: 200 }}>
            {props.examList.map(item=><Option key={item.exam_id}>{item.exam_name}</Option>)}
            {console.log(props.detailList)}
        </Select>
    )}
</Form.Item>

<Form.Item>
        <p>*选择课程</p>
    {getFieldDecorator('subject_id', {
            rules: [{ required: true, message: "题目类型必选" }],
            initialValue: "项目实战"
    })(
        <Select style={{ width: 200 }}>
            {props.subjects.map(item=><Option key={item.subject_id} value={item.subject_text}>{item.subject_text}</Option>)}
        </Select>
    )}
</Form.Item>

<Button className="btn" type="primary" type="primary" size="large">Q 查询</Button>
     </div>
  <div className="mainList">
  <div className="mainTitle"><h1>试卷列表</h1><p><span data-index="1"  className="spn">全部</span><span data-index="2" className="spn">进行中</span>
  <span data-index="3" className="spn">已结束</span></p></div>
     <Table columns={columns} dataSource={props.paylist} pagination={false} />
     </div>  
</Form>
</div>
)}
 Paperlist.propTypes={
 }
const mapStateToprops=(state)=>{
    return {
        ...state.paperExam,
        ...state.power
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
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
        PaperList:payload=>{
            dispatch(
                {
                 type:"paperExam/PaperList",
                 payload
                }
            )
        },
        detaiData:payload=>{
            dispatch(
                {
                  type:"paperExam/detaiData"
                }
            )
        }
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(Form.create()(Paperlist))
