/**
 * 添加视图接口权限
*/
import React, { useEffect } from 'react'
import {connect} from 'dva'
import { Button, Radio,Form,message,Select,} from 'antd';
const Addviewauth = (props) => {
    const { Option } = Select;
    let {viewauth,viewPower} = props;
    useEffect(()=>{
        props.getviewauth();
    },[])
    const { getFieldDecorator } = props.form;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
             let val= viewauth.filter(file=>file.view_authority_id===values.view);
              props.addviewPower({
                view_authority_text:val[0].view_authority_text,
                 view_id:val[0].view_id
              })
             if(viewPower){
                 message.info(viewPower.msg)
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
        <Radio.Button value="large">添加视图接口权限</Radio.Button>
        </Radio.Group> 
        <Form className="useinp" onSubmit={()=>handleSubmit()}>
            <Form.Item>
                {getFieldDecorator('view', {
                        rules: [{ required: true, message: '不可为空' }],
                    })(
                    <Select placeholder="请选择已有视图" style={{ width: 180 }}>
                        {viewauth&&viewauth.map(file=>
                    <Option key={file.view_authority_id}>{file.view_authority_text}</Option>
                     )}</Select>
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
        //获取视图权限数据
      getviewauth:()=>{
        dispatch({
            type:"user/viewauth"
        })
      },
      //添加视图权限
      addviewPower:(payload)=>{
          dispatch({
              type:"user/addview",
              payload
          })
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Addviewauth))
