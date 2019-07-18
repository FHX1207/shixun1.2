import React, { useState, useEffect } from 'react'
import styles from '../css/classfiy.scss';
import { Modal, Table,Button ,Form,Input, message,Spin} from 'antd';
import {connect} from 'dva'

function classfiy(props){
    console.log(props)
        //设置表头
        const columns=[
            {
                title:'类型ID',
                dataIndex: 'questions_type_id', 
                key:"id"                     
            },
            {
                title:'类型名称',
                dataIndex: 'questions_type_text', 
                key:"text"                     
            },
            {
                title:'操作',
                dataIndex: '', 
                key:"action"                     
            }
    ] 
    let [showModal,updateModal] = useState(false);
    //初始调用
        useEffect(()=>{
            props.type()
        },[])
    function handleSubmit(){
        //校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        // props.form.validateFields
    props.form.validateFields((err,values)=>{
            console.log('err...',err);
            if(!err){
                  console.log(values);
                props.addQuestionType({
                    text:values.type,
                    sort:props.TypeList.length+1
                })
                updateModal(false)
            }else{
                message.error(err.types.errors[0].message)
            }
        })
    }
        console.log(showModal)
    const {getFieldDecorator}=props.form;
    //获取所有试题类型
    return <div className="classPage">
                <h1>试题分类</h1>
          <div className="classMains">
                <Button className="btn" onClick={()=>updateModal(true)}>+ 添加类型</Button>
              <Table columns={columns} dataSource={props.TypeList} rowKey='questions_type_id'  size="middle" />
          </div>
    <Modal
    visible={showModal}
        title="添加考试类型"
        onCancel={()=>updateModal(false)}
        onOk={()=>handleSubmit()}
    >
<Form onSubmit={handleSubmit}>
        <Form.Item>
            {getFieldDecorator('type', {
                rules: [{ required: true, message: '请输入类型名称' }],
            })(
                <Input
                placeholder="请输入类型名称"
                />
            )}
      </Form.Item>
 </Form>
    </Modal>
    {props.global?<div className={styles.loading}><Spin/></div>:null}
</div>
} 
const mapStateToProps=state=>{
    console.log('state...',state)
    return {
        TypeList:state.power.TypeList
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        //获取所有试题
        type:payload=>{
            dispatch({
                type:'power/type',
                payload
            })
        },
        //获取
        //参数名	必选	类型	说明
        // text	是	string	试题名称
        // sort	是	string	试题序号
        addQuestionType:payload=>{
            dispatch({
                type:'power/addQuestionType',
                payload
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(classfiy))



