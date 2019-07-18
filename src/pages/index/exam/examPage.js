import React from "react";
import { Layout, Menu, Icon} from 'antd';
import styles from "./css/examPage.css"
import Checkquestion from "./questions/checkquestion"
import Addquestion from "./questions/addquestions"
import Details from "./questions/detail"
import { Route } from "dva/router";
import Classfiy from "./questions/classfiy";
import AddExam from './Exam_management/addExam';
import Detail from './Exam_management/detail'
import Edit from './Exam_management/edit'
import Paperlist from './Exam_management/paperList'
const { Sider } = Layout;
const { SubMenu } = Menu;
const detail=(history,path)=>{
    history.push(path)
    
}

function examPage(props){
    let {history}= props;
    return(
        <div className={styles.exam}>
         <div className={styles.useheader}>
           <span><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt=""></img></span>
           <span>用户</span>
         </div>
          <Layout style={{ minHeight: '90vh' }}>
          {/* 左侧导航 */}
            <Sider>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                     <SubMenu
                        key="sub1"
                        title={
                            <span>
                            <Icon type="fund" />
                            <span>试题管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1" onClick={()=>{detail(history,"/exam/addquestion")}}>添加试题</Menu.Item>
                        <Menu.Item key="2" onClick={()=>{detail(history,"/exam/classfiy")}}>试题分类</Menu.Item>
                        <Menu.Item key="3" onClick={()=>{detail(history,"/exam/checkquestion")}}>查看试题</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                            <Icon type="user" />
                            <span>用户管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="4">添加用户</Menu.Item>
                        <Menu.Item key="5">用户展示</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                            <Icon type="read" />
                            <span>考试管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6" onClick={()=>{detail(history,"/exam/addExam")}}>添加考试</Menu.Item>
                        <Menu.Item key="7" onClick={()=>{detail(history,"/exam/paperList")}}>试卷列表</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                            <Icon type="container" />
                            <span>班级管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="8">班级管理</Menu.Item>
                        <Menu.Item key="9">教室管理</Menu.Item>
                        <Menu.Item key="10">学生管理</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={
                            <span>
                            <Icon type="container" />
                            <span>阅卷管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="11">待批班级</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            {/* 右侧详情 */}
            {/* <Layout> */}
                <Route path="/exam/checkquestion" component={Checkquestion}></Route>
                <Route path="/exam/addquestion" component={Addquestion}></Route>
                <Route path="/exam/details" component={Details}></Route>
                <Route path="/exam/classfiy" component={Classfiy}></Route>
                <Route path="/exam/addExam" component={AddExam}></Route>
                <Route path="/exam/detail" component={Detail}></Route>
                <Route path="/exam/edit" component={Edit}></Route>
                <Route path="/exam/paperList" component={Paperlist}></Route>
                
            </Layout>
          {/* </Layout> */}
        </div>
    )
}
    

export default examPage;