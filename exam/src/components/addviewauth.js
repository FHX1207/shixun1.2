/**
 * 添加视图接口权限
*/
import React, { useEffect, useState } from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Form,message,Select,} from 'antd';
const Addviewauth = (props) => {
    const { Option } = Select;
    let {viewauth} = props;
    useEffect(()=>{
        props.getviewauth();
    },[])
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
        <Radio.Button value="large">添加视图接口权限</Radio.Button>
        </Radio.Group> 
        <Form className="useinp" onSubmit={()=>handleSubmit()}>
            <Form.Item>
                {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                    <Select placeholder="请选择已有视图" style={{ width: 180 }}>
                        {viewauth&&viewauth.map(file=>
                    <Option key={file.view_authority_id}>{file.view_authority_text}</Option>
                     )}</Select>
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
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Addviewauth))
