/**
 * 添加用户 更新用户
 */
import React, { useState } from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Select,Form,message} from 'antd';
const User = (props) => {
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    let {listidentity,listuser,addUser,newUser} = props;
    const [visible,setvisible]=useState("large")
    const Tabs=()=>{
        if(visible==="default"){
            setvisible("large")
        }else{
            setvisible("default")
        }
    }
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
               if(visible==="large"){
                    props.getadduser({
                    user_name: values.username,
                    user_pwduser_pwd: values.password,
                   })
               }
               else if(visible==="default"){
                   props.newupdateuser({
                        user_id:values.newuserid,
                        user_name:values.username,
                        user_pwd:values.userpassword,
                        identity_id:values.newviewid
                   })
               }
            }
          });
          if(visible==="large"){
            message.info(addUser.msg)
          }else if(visible==="default"){
            message.info(newUser.msg)
          }
    }
    let handleReset=()=>{
        props.form.resetFields();
    }
  return (
    <div className="userlist">
        <Radio.Group value={visible} onChange={()=>Tabs()}>
            <Radio.Button value="large">添加用户</Radio.Button>
            <Radio.Button value="default">更新用户</Radio.Button>
        </Radio.Group> 
        <Form  className="useinp" onSubmit={()=>handleSubmit()}>
           {/* 更新用户 */}
           {visible==="large"?"":
             <Form.Item>
                {getFieldDecorator('newuserid', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Select placeholder="请选择身份id" style={{ width: 180 }}>
                        {listuser&&listuser.map(file=>
                            <Option value={file.user_id} key={file.user_id}>{file.user_name}</Option>
                        )}
                       </Select>
                    )}
             </Form.Item>        
            }
            <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="请输入用户名"/>
                    )}
            </Form.Item>
            <Form.Item>
                    {getFieldDecorator('userpassword', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input type="password" placeholder="请输入密码" />
                    )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('newviewid', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                <Select placeholder="请选择身份id" style={{ width: 180 }}>
                {listidentity&&listidentity.map(file=>
                    <Option value={file.identity_id} key={file.identity_id}>{file.identity_text}</Option>
                )}
               </Select>
                    )}
            </Form.Item>
            
            <br/>
        
            <Button type="primary" style={{ width: 120,marginTop:20}} htmlType="submit">确定</Button>
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
        //添加用户
      getadduser:(payload)=>{
            dispatch({
                type:"user/addusers",
                payload
            })
      },
       //更新用户信息（用户名，用户密码，用户身份）
      newupdateuser:(payload)=>{
            dispatch({
                type:"user/newUpdate",
                payload
            })
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(User))
