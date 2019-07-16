import React, { useEffect, useState } from 'react'
import {connect} from 'dva'
import { Button, Radio,Input,Select,Form} from 'antd';
const User = (props) => {
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    let {listidentity,listuser} = props;
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
              console.log('Received values of form: ', values);
            }
          });
    }
  return (
    <div className="userlist">
        <Radio.Group value={visible} onChange={()=>Tabs()}>
            <Radio.Button value="large">添加用户</Radio.Button>
            <Radio.Button value="default">更新用户</Radio.Button>
        </Radio.Group> 
        <Form  className="useinp" onSubmit={()=>handleSubmit()}>
            {visible==="large"?"":
                <Select defaultValue="请选择身份id" style={{ width: 180 }}>
                        {listuser&&listuser.map(file=>
                            <Option value={file.user_name} key={file.user_id}>{file.user_name}</Option>
                        )}
                </Select>
            }
            <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder="请输入用户名"/>
                    )}
            </Form.Item>
            <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input type="password" placeholder="请输入密码" />
                    )}
            </Form.Item>
            <Select defaultValue="请选择身份id" style={{ width: 180 }}>
                {listidentity&&listidentity.map(file=>
                    <Option value={file.identity_text} key={file.identity_id}>{file.identity_text}</Option>
                )}
            </Select>
            <br/>
            <Button type="primary" style={{ width: 120,marginTop:20}} htmlType="submit">确定</Button>
            <Button >重置</Button>
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

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(User))
