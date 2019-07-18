/**
 * 给身份设置视图权限
*/
import React, { useEffect } from 'react'
import {connect} from 'dva'
import { Button, Radio,Form,message,Select,} from 'antd';
const Getuserview = (props) => {
    let {viewauth,listidentity,statusView} = props;
    useEffect(()=>{
        props.getviewauth();
        props.getidentity();
    },[])
    const { Option } = Select;
   
    const { getFieldDecorator } = props.form;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
              props.setViewPowr({
                identity_id:values.rules,
                view_authority_id:values.password
              })
              if(statusView){
                  message.info(statusView.msg)
              }
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
        <Button type="primary" style={{ width: 120 }} htmlType="submit">确定</Button>
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
      //给身份设置视图权限
      setViewPowr:(payload)=>{
          dispatch({
              type:"user/setStatusView",
              payload
          })
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Getuserview))
