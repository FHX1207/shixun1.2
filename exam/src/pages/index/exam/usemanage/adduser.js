import React, { useEffect} from 'react'
import {connect} from "dva";
import "../css/userPage.scss"
import { Form} from 'antd';
import Party from "@/components/user.js"
import Adduserist from "@/components/adduserlist.js"
import Addapiauth from "@/components/addapiauth.js"
import Addviewauth from "@/components/addviewauth.js"
import Setapiauth from "@/components/setapiauth.js"
import Getuserview from "@/components/getuserview.js"
function adduser(props){
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
    },[])
    
    return (
        <div className="adduser">
            <h2>添加用户</h2>
            <div className="detail">
                <Party/>
                <Adduserist/>
                <Addapiauth/>
                <Addviewauth/>
                <Setapiauth/>
                <Getuserview/>
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
      
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(adduser))