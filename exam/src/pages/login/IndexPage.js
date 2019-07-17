import React,{useEffect} from "react";
import {connect} from "dva";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import "./IndexPage.css"

function LoginPage(props){
    //console.log(props);
    //模拟componentDidmount
    // useEffect(()=>{
    //     // console.log("执行");
    //     props.login({user_name: 'chenmanjie', user_pwd: 'Chenmanjie123!'});
    // },[])

    //判断是否登录成功
    useEffect(()=>{
      if(props.isLogin===1){
        //弹出
        message.success("登录成功")
        let path="/";
        if(props.location.search){
          path=decodeURIComponent(props.location.search.split("=")[1]);
        }
        props.history.push(path);
      }else if(props.isLogin===0){
        message.success("用户名或密码错误")
      }
    },[props.isLogin])

    //表单
    let handleSubmit = () => {
        props.form.validateFields((err, values) => {
          if (!err) {
            props.login({user_name: values.username, user_pwd: values.password});
            //console.log('Received values of form: ', values);
            if(props.isLogin){
                props.history.push({pathname:"/exam"})
            }
          }
        });
    }
    const { getFieldDecorator } = props.form;
    return (
       <div className="login">
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                validateTrigger: 'onBlur',
                rules: [
                  { required: true, message: 'Please input your username!' },
                  { min: 6, max: 15, message: 'Please input your correct username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: 'Please input your Password!' },
                { pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.]).*$/, message: 'Please input your correct password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>同意协议</Checkbox>)}
              <Button type="primary" htmlType="submit" className="login-form-button">
               登录
              </Button>
            </Form.Item>
          </Form>
       </div> 
    )
}
   

const mapStateToProps=state=>{
    return {...state.login}
}
const mapDispatchToPorps=dispatch=>{
    return {
        login:payload=>{
            dispatch({
                type:"login/login",
                payload
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToPorps)(Form.create()(LoginPage));