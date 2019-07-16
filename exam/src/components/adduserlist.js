import React, { useEffect, useState } from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Form,message} from 'antd';
const Adduserlist = (props) => {
    const { getFieldDecorator } = props.form;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
               console.log(values.identity)
               props.getedit().title({
                 identity_text:values.identity
               })
            }
          });
          console.log(props.editidentity)
        //   if(props.editidentity){
        //     message.info(props.editidentity.msg);
        //   }
    }
  return (
    <div className="userlist">
        <Radio.Group value="large" >
        <Radio.Button value="large">添加身份</Radio.Button>
        </Radio.Group> 
        <Form className="useinp" onSubmit={()=>handleSubmit()}>
            <Form.Item>
                {getFieldDecorator('identity', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input placeholder="请输入身份名称" />
                )}
            </Form.Item>
            <Button type="primary" style={{ width: 120 }} htmlType="submit">确定</Button>
            <Button>重置</Button>
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
        getedit:()=>{
            return {
                title:payload=>{
                    dispatch({
                        type:"user/addedit",
                        payload
                    })
                }
            }
          },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Adduserlist))
