import React, { useEffect,useState} from 'react'
import {connect} from "dva";
import "../css/userPage.scss"
import { Button,Tabs, Radio, Icon ,Input,Select} from 'antd';

const { TabPane } = Tabs;
function adduser(props){
    let {authority} = props;
    console.log(authority)
    useEffect(()=>{
        props.getapiauth()
    },[])
    const { Option } = Select;
  
    const handleChange=(value)=> {
       console.log(`selected ${value}`);
    }
    return (
        <div className="adduser">
            <h2>添加用户</h2>
            <div className="detail">
               <div className="userlist">
               {/* tab切换 */}
                  {/* <Radio.Group value={visible}>
                    <Radio.Button value="large" onClick={()=>tab()}>添加用户</Radio.Button>
                    <Radio.Button value="default" onClick={()=>tab()}>更新用户</Radio.Button>
                  </Radio.Group>  */}
                <Tabs defaultActiveKey="添加用户" tabPosition="top" >
                        <TabPane tab="添加用户" key="1">
                        <div className="useinp">
                                <Input placeholder="请输入用户名" />
                                <Input placeholder="请输入密码" />
                                <Select defaultValue="请选择身份id" style={{ width: 180 }}>
                                    <Option value="jack">管理员</Option>
                                    <Option value="lucy">出题者</Option>
                                    <Option value="Yiminghe">浏览者</Option>
                                </Select>
                        </div>
                        </TabPane>
                        <TabPane tab="更新用户" key="2">
                        <div className="useinp">
                                 <Select defaultValue="请选择身份id" style={{ width: 180 }}>
                                    <Option value="jack">管理员</Option>
                                    <Option value="lucy">出题者</Option>
                                    <Option value="Yiminghe">浏览者</Option>
                                </Select>
                                <Input placeholder="请输入用户名" />
                                <Input placeholder="请输入密码" />
                                <Select defaultValue="请选择身份id" style={{ width: 180 }}>
                                    <Option value="jack">管理员</Option>
                                    <Option value="lucy">出题者</Option>
                                    <Option value="Yiminghe">浏览者</Option>
                                </Select>
                        </div>
                        </TabPane>
                 </Tabs>
                  <Button type="primary" style={{ width: 120 }} >确定</Button>
                  <Button>重置</Button>
               </div>
               <div className="userlist">
                  <Radio.Group value="large" >
                    <Radio.Button value="large">添加身份</Radio.Button>
                  </Radio.Group> 
                  <div className="useinp">
                     <Input placeholder="请输入身份名称" />
                  </div>
                  <Button type="primary" style={{ width: 120 }}>确定</Button>
                  <Button>重置</Button>
               </div>
               <div className="userlist">
                  <Radio.Group value="large">
                    <Radio.Button value="large">添加api接口权限</Radio.Button>
                  </Radio.Group> 
                  <div className="useinp">
                     <Input placeholder="请输入api接口权限名称" />
                     <Input placeholder="请输入api接口权限url" />
                     <Input placeholder="请输入api接口权限方法" />
                  </div>
                  <Button type="primary" style={{ width: 120 }}>确定</Button>
                  <Button>重置</Button>
               </div>
               <div className="userlist">
                  <Radio.Group value="large">
                    <Radio.Button value="large">添加视图接口权限</Radio.Button>
                  </Radio.Group> 
                  <div className="useinp">
                     <Select defaultValue="请选择已有视图" style={{ width: 180 }}>
                        <Option value="jack">管理员</Option>
                        <Option value="lucy">出题者</Option>
                        <Option value="Yiminghe">浏览者</Option>
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
                        <Option value="jack">管理员</Option>
                        <Option value="lucy">出题者</Option>
                        <Option value="Yiminghe">浏览者</Option>
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
                        <Option value="jack">管理员</Option>
                        <Option value="lucy">出题者</Option>
                        <Option value="Yiminghe">浏览者</Option>
                     </Select>
                     <Select defaultValue="请选择视图权限id" style={{ width: 180 }}>
                        <Option value="jack">管理员</Option>
                        <Option value="lucy">出题者</Option>
                        <Option value="Yiminghe">浏览者</Option>
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
      getapiauth:()=>{
          dispatch({
              type:"user/apiauth"
          })
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(adduser)