/**
 * 给身份设置视图权限
*/
import React, { useEffect, useState } from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Form,message,Select,} from 'antd';
const Getuserview = (props) => {
    let {viewauth,listidentity} = props;
    useEffect(()=>{
        props.getviewauth();
        props.getidentity();
    },[])
    const { Option } = Select;
   
    const { getFieldDecorator } = props.form;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
              props.getedit({identity_text:values.identity})
            }
          if(!err){
            message.info("成功");
          }
          });
    }
    let handleReset=()=>{
        props.form.resetFields();
    }
  return (
    <div className="userlist">
    <Radio.Group value="large">
      <Radio.Button value="large">给身份设置视图权限</Radio.Button>
    </Radio.Group> 
    <Form className="useinp" onSubmit={()=>handleSubmit()}>
       <Form.Item>
          {getFieldDecorator('rules', {
                rules: [{ required: true, message: 'Please input your password!' }],
            })(
                <Select placeholder="请选择身份id" style={{ width: 180,marginBottom:20, }}>
                {listidentity&&listidentity.map(file=>
                    <Option  key={file.identity_id}>{file.identity_text}</Option>
                )}
            </Select>
           )} 
       </Form.Item>
       <Form.Item>
       {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
         })(
            <Select placeholder="请选择视图权限id" style={{ width: 180 }}>
            {viewauth&&viewauth.map(file=>
                <Option key={file.view_authority_id}>{file.view_authority_text}</Option>
            )}
           </Select>
        )} 
           
       </Form.Item>
        <Button type="primary" style={{ width: 120 }}>确定</Button>
        <Button onClick={()=>handleReset()}>重置</Button>
    </Form>
 </div>
  );
};

const mapStateToProps = (state) => {
    return {
        ...state.user 
    }
 }
const mapDispatchToProps = dispatch => {
    return {
        //获取视图权限数据
      getviewauth:()=>{
        dispatch({
            type:"user/viewauth"
        })
      },
       //展示身份数据
       getidentity:()=>{
        dispatch({
            type:"user/identity"
        })
    },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Getuserview))
