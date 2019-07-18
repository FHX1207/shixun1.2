/**
 *给身份设置api接口权限
*/
import React, { useEffect} from 'react'
import {connect} from 'dva'
import { Button, Radio,Form,Select,message} from 'antd';
const Setapiauth = (props) => {
    const { Option } = Select;
    let {authority,listidentity,Jurisdiction} = props;
    useEffect(()=>{
        props.getapiauth();
        props.getidentity();
    },[])
    const { getFieldDecorator } = props.form;
    let handleSubmit=()=>{
        props.form.validateFields((err, values) => {
            if (!err) {
             let list= listidentity.filter(file=>file.identity_text===values.listidentity);
             let apiAuthority=authority.filter(file=>file.api_authority_text===values.authority);
              props.apiPower({
                identity_id:list[0].identity_id ,
                api_authority_id:apiAuthority[0].api_authority_id ,
              })
              if(Jurisdiction){
                  message.info(Jurisdiction.msg)
              }
            }
          });
         
    }
    let handleReset=()=>{
        props.form.resetFields();
    }
  return (
    <div className="userlist">
    <Radio.Group value="large" >
      <Radio.Button value="large">给身份设置api接口权限</Radio.Button>
    </Radio.Group> 
    <Form className="useinp" onSubmit={()=>handleSubmit()}>
      <Form.Item>
       {getFieldDecorator('listidentity', {
                rules: [{ required: true, message: '不可为空' }],
            })(
                <Select placeholder="请选择身份id" style={{ width: 180,marginBottom:20, }}>
                {listidentity&&listidentity.map(file=>
                    <Option value={file.identity_text} key={file.identity_id}>{file.identity_text}</Option>
                 )}
              </Select>
         )} 
       </Form.Item>
       <Form.Item>
       {getFieldDecorator('authority', {
                rules: [{ required: true, message: '不可为空' }],
            })(
          <Select placeholder="请选择api接口权限" style={{ width: 180 }}>
            {authority&&authority.map(file=>
                <Option value={file.api_authority_text} key={file.api_authority_id}>{file.api_authority_text}</Option>
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
     //展示api接口权限数据
    getapiauth:()=>{
        dispatch({
            type:"user/apiauth"
        })
    },
    //展示身份数据
    getidentity:()=>{
        dispatch({
            type:"user/identity"
        })
    },
    //给身份设置api接口权限
    apiPower:(payload)=>{
        dispatch({
            type:"user/apiJurisdiction",
            payload
        })
    }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Setapiauth))
