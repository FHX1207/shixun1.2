import React, { useEffect, useState, Component } from 'react'
import styles from '../css/edit.scss'
import { Input ,Form, Layout, Menu,Button, Icon ,Select,Modal,message,Spin} from 'antd';
function Edit(props){  
    useEffect(() => {
    },[])
    function juamp(path){
        props.history.push(path)
    }
    let data=JSON.parse(window.localStorage.getItem('exam'))
    return (   
            <div className="editPage">
                <div>
                      <h1>创建试卷</h1>
                </div>
                <div className="main">
                     <button>添加新题</button>
                       <div>
                                  <h1 className="tit">{data.title}</h1>
                                <p className="message">考试时间：<span>{new Date(parseInt(data.end_time-data.start_time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</span>
                                    监考人：<span>{data.questions[0].user_name}</span>
                                    开始考试时间：<span>{new Date(parseInt(data.start_time) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")}</span>
                                </p>
                       </div>
                       <div>
                              {console.log(data.questions)}
                              {data.questions.map(item=>
                                           <div className="data">
                                                <p>{item.title}</p>
                                                <p>{item.questions_answer}</p>
                                           </div> 
                              )}
                       </div>
                </div>
             <Button onClick={()=>{juamp('/exam/paperList')}} type="primary" className="btns" type="primary" size="large">
                  创建试卷
            </Button>
            </div>
           )
     }
export default Edit
