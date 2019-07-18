/**
 * 添加身份
*/
import React from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Form,message} from 'antd';
const Adduserlist = (props) => {
    const { getFieldDecorator } = props.form;
    let {editidentity} = props;
    let num = Object.keys(editidentity).length;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
              props.getedit({identity_text:values.identity})
            }
            if(num>0){
              message.info(editidentity.msg)
            }
          });
    }
    let handleReset=()=>{
        props.form.resetFields();
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
        //添加身份
        getedit:(payload)=>{
            dispatch({
                type:"user/addedit",
                payload
            })
          },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Adduserlist))
