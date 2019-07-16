import React, { useEffect,useState} from 'react'
import {connect} from "dva";
import "../css/userPage.scss"
import { Button, Radio,Input,Select,Form} from 'antd';
import Party from "@/components/user.js"

function adduser(props){
    const { Option } = Select;
    const { getFieldDecorator } = props.form;
    let {authority,viewauth,listidentity} = props;
    //api接口权限数据===authority
    //视图权限数据===viewauth
    //身份数据==listidentity
    //获取当前用户信息=====listuserInfo
    //展示用户数据===listuser
    useEffect(()=>{
        props.getapiauth();
        props.getviewauth();
        props.getidentity();
        props.getuserInfo();
        props.getuser();
        props.getadduser();
    },[])
    
 
    return (
        <div className="adduser">
            <h2>添加用户</h2>
            <div className="detail">
                <Party/>
               <div className="userlist">
                  <Radio.Group value="large" >
                    <Radio.Button value="large">添加身份</Radio.Button>
                  </Radio.Group> 
                  <Form className="useinp">
                       <Form.Item>
                            {getFieldDecorator('identity', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input placeholder="请输入身份名称" />
                            )}
                       </Form.Item>
                        <Button type="primary" style={{ width: 120 }}>确定</Button>
                       <Button>重置</Button>
                  </Form>
                 
               </div>
               <div className="userlist">
                  <Radio.Group value="large">
                    <Radio.Button value="large">添加api接口权限</Radio.Button>
                  </Radio.Group> 
                  <Form className="useinp">
                       <Form.Item>
                            {getFieldDecorator('username3', {
                                rules: [{ required: true, message: '不可为空' }],
                            })(
                                <Input placeholder="请输入api接口权限名称" />
                            )}
                       </Form.Item>
                       <Form.Item>
                            {getFieldDecorator('username4', {
                                rules: [{ required: true, message: '不可为空' }],
                            })(
                                <Input placeholder="请输入api接口权限url" />
                            )}
                       </Form.Item>
                       <Form.Item>
                            {getFieldDecorator('username5', {
                                rules: [{ required: true, message: '不可为空' }],
                            })(
                                <Input placeholder="请输入api接口权限方法" />
                            )}
                       </Form.Item>
                  </Form>
                  <Button type="primary" style={{ width: 120 }}>确定</Button>
                  <Button>重置</Button>
               </div>
               <div className="userlist">
                  <Radio.Group value="large">
                    <Radio.Button value="large">添加视图接口权限</Radio.Button>
                  </Radio.Group> 
                  <div className="useinp">
                     <Select defaultValue="请选择已有视图" style={{ width: 180 }}>
                      {viewauth&&viewauth.map(file=>
                          <Option value={file.view_authority_text} key={file.view_authority_id}>{file.view_authority_text}</Option>
                        )}
                     </Select>
                  </div> 
                  <Button type="primary" style={{ width: 120 }}>确定</Button>
                  <Button>重置</Button>
               </div>
               <div className="userlist">
                  <Radio.Group value="large" >
                    <Radio.Button value="large">给身份设置api接口权限</Radio.Button>
                  </Radio.Group> 
                  <div className="useinp">
                     <Select defaultValue="请选择身份id" style={{ width: 180,marginBottom:20, }}>
                       {listidentity&&listidentity.map(file=>
                                    <Option value={file.identity_text} key={file.identity_id}>{file.identity_text}</Option>
                        )}
                     </Select>
                     <Select defaultValue="请选择api接口权限" style={{ width: 180 }}>
                        {authority&&authority.map(file=>
                             <Option value={file.api_authority_text} key={file.api_authority_id}>{file.api_authority_text}</Option>
                            )}
                     </Select>
                  </div> 
                  <Button type="primary" style={{ width: 120 }}>确定</Button>
                  <Button>重置</Button>
               </div>
               <div className="userlist">
                  <Radio.Group value="large">
                    <Radio.Button value="large">给身份设置视图权限</Radio.Button>
                  </Radio.Group> 
                  <div className="useinp">
                     <Select defaultValue="请选择身份id" style={{ width: 180,marginBottom:20, }}>
                       {listidentity&&listidentity.map(file=>
                            <Option value={file.identity_text} key={file.identity_id}>{file.identity_text}</Option>
                        )}
                     </Select>
                     <Select defaultValue="请选择视图权限id" style={{ width: 180 }}>
                       {viewauth&&viewauth.map(file=>
                          <Option value={file.view_authority_text} key={file.view_authority_id}>{file.view_authority_text}</Option>
                        )}
                     </Select>
                  </div> 
                  <Button type="primary" style={{ width: 120 }}>确定</Button>
                  <Button>重置</Button>
               </div>
            </div>
        </div>
    )
}
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
      //获取当前用户信息
      getuserInfo:()=>{
          dispatch({
              type:"user/userInfo"
          })
      },
      //展示用户数据
      getuser:()=>{
          dispatch({
              type:"user/users"
          })
      },
      //添加用户
      getadduser:()=>{
        return {
            title:payload=>{
                dispatch({
                    type:"user/addusers",
                    payload
                })
            }
        }
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(adduser))