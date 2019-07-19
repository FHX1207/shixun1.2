import React, { useEffect,useState } from 'react'
import {connect} from "dva";
import { Menu, Dropdown, Icon,Avatar, Modal, Button ,Upload,message} from 'antd';
import axios from "axios"
function userList(props){
     let { userMessage, newUser} = props;
  
    let [flag,setflag]=useState(false)
    let [newimg,setimg]=useState(userMessage.avatar)
    function showModal(){
       setflag(true)
    }
    function change(e){
        let form = new FormData();
       
        //  console.log(e.nativeEvent)
        form.append(e.nativeEvent.target.files[0].name,e.nativeEvent.target.files[0]);
        axios.post("http://123.206.55.50:11000/upload",form).then(res=>{
            // console.log(res.data)
             if(res.data.code===1){
                //  console.log(res.data.data[0].path)
                 message.success(res.data.msg)
                 setimg(res.data.data[0].path)
                 props.updateuser({
                    user_id:userMessage.user_id,
                    avatar:res.data.data[0].path
                 })
             }
          }  
        )
    }
    let handleOk = () => {
        setflag(false)
    };
    let handleCancel = () => {
       setflag(false)
      };
    let menu = (
        <Menu>
          <Menu.Item>
             <span>个人中心</span>
          </Menu.Item>
          <Menu.Item>
             <span>我的班级</span>
          </Menu.Item>
          <Menu.Item>
             <span onClick={()=>{showModal()}}>更新设置</span>
          </Menu.Item>
          <Menu.Item>
             <span>退出登录</span>
          </Menu.Item>
        </Menu>
      );
      
      let fileList=[{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: newimg,
        thumbUrl: newimg
      }]
      //"http://123.206.55.50:11000/upload"
      //'https://www.mocky.io/v2/5cc8019d300000980a055e76'
      let imgs={action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      defaultFileList: [...fileList]}
    return (
        <>
           <div>
               {/* <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt=""></img>     */}
           </div>
           <div>
            <Dropdown overlay={menu}>
                <span className="ant-dropdown-link" >
                <Avatar src={userMessage.avatar} ></Avatar> {userMessage.user_name} <Icon type="down" />
                </span>
            </Dropdown>
           </div>
                <Modal
                title="更新信息"
                visible={flag}
                onOk={()=>handleOk()}
                onCancel={()=>handleCancel()}
                >
                <p>用户名：{userMessage.user_name}</p>
                <p>用户身份：{userMessage.identity_text}</p>
                <div>更新头像：
                    <Upload {...imgs}>
                        <Button>
                            <Icon type="upload"/> Upload
                        </Button>
                    </Upload>
                    <input type="file" onChange={(e)=>change(e)}></input>
                </div>
                </Modal>
          
         </>
    )

}
const mapStateToProps = (state) => {
   // console.log("state...",state)
    return { 
        userMessage : state.login.listuserInfo,
        ...state.user 
    }
 }
const mapDispatchToProps = dispatch => {
    return {
        updateuser:(payload)=>{
            dispatch({
                 type:"user/newUpdate",
                 payload
            })
           
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(userList)  