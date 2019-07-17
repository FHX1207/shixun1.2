/**
 * 添加api接口权限
 */
import React, { useEffect, useState } from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Form,message} from 'antd';
const Addapiauth = (props) => {
    const { getFieldDecorator } = props.form;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
           if(!err){
               console.log(values)
               props.addapiedit({
                api_authority_text:values.apiname,
                api_authority_url:values.apiurl,
                api_authority_method:values.apiquest
               })
           }
          });
         
    }
    let handleReset=()=>{
        props.form.resetFields();
    }
  return (
    <div className="userlist">
        <Radio.Group value="large">
        <Radio.Button value="large">添加api接口权限</Radio.Button>
        </Radio.Group> 
        <Form className="useinp" onSubmit={()=>handleSubmit()}>
            <Form.Item>
                {getFieldDecorator('apiname', {
                    rules: [{ required: true, message: '不可为空' }],
                })(
                    <Input placeholder="请输入api接口权限名称" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('apiurl', {
                    rules: [{ required: true, message: '不可为空' }],
                })(
                    <Input placeholder="请输入api接口权限url" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('apiquest', {
                    rules: [{ required: true, message: '不可为空' }],
                })(
                    <Input placeholder="请输入api接口权限方法" />
                )}
            </Form.Item>
             <Button type="primary" style={{ width: 120 }}  htmlType="submit">确定</Button>
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
         //添加api接口权限
         addapiedit:(payload)=>{
            dispatch({
                type:"user/addapi",
                payload
            })
         }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Addapiauth))
