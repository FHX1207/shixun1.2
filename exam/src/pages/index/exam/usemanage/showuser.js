import React, { useEffect} from 'react'
import {connect} from "dva";
import "../css/userPage.scss"
import {Radio} from 'antd';
function adduser(props){
    const handleSizeChange=()=>{
        console.log(145)
    }
    return (
        <div className="showuser">
            <h2>用户展示</h2>
            <div className="detail">
                <div className="showlist">
                  <Radio.Group value="large" onChange={()=>handleSizeChange()}>
                    <Radio.Button value="large">用户数据</Radio.Button>
                    <Radio.Button value="default">身份数据</Radio.Button>
                    <Radio.Button value="one">api接口数据</Radio.Button>
                    <Radio.Button value="two">身份和api接口关系</Radio.Button>
                    <Radio.Button value="three">视图接口权限</Radio.Button>
                    <Radio.Button value="fore">身份和视图权限关系</Radio.Button>
                  </Radio.Group> 
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        ...state.exam 
    }
 }
const mapDispatchToProps = dispatch => {
    return {
     
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(adduser)