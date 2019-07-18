import React, {useEffect,useState} from 'react'
import {connect} from "dva";
import "../css/userPage.scss"
import {Radio} from 'antd';

function adduser(props){
    const handleSizeChange=()=>{
        console.log(125)
    }
    let [visible,setvisible] = useState(0);
    let navTab=[
        {name:"用户数据"},
        {name:"身份数据"},
        {name:"api接口数据"},
        {name:"身份和api接口关系"},
        {name:"视图接口权限"},
        {name:"身份和视图权限关系"}
    ]
    return (
        <div className="showuser">
            <h2>用户展示</h2>
            <div className="detail">
                <div className="showlist">
                  <Radio.Group value={visible} onChange={()=>handleSizeChange()}>
                     {navTab.map((file,index)=>
                         <Radio.Button value={index} key={index}>{file.name}</Radio.Button>
                     )}
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