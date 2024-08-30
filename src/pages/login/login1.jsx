/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-20 17:15:10
 * @LastEditTime: 2024-08-29 17:46:46
 */
import React, { Component } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import './login.less'


export default class Login extends Component {
  constructor(props){
     super(props)
     
  }

  onFinish = (values) => {
    console.log(222,this)

    const { username, password } = values
    if(username === 'admin' && password === 'admin'){
        message.success('登录成功...')
      }
  }
  
  onFinishFailed = (errorInfo) => {
          console.log('Fail:', errorInfo);

    // if(!username === 'admin' || !password === 'admin'){
    //   console.log('Fail:', errorInfo);
    //   message.error('账户或者密码错误...')
    
  }
  render() {
    return (
      // <div className='login'>
      <div style={{width:'100%',height:'100%',display:'flex'}}>
        <div style={{height: '500px',width:'500px',margin:'auto',paddingLeft:'60px',paddingTop:'80px'}}>
        <div style={{paddingLeft:'65px',paddingBottom:'30px',fontSize:'30px',fontWeight:'bold'}}>本原智数管理系统</div>
        <Form style={{ maxWidth: 360 }} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请填写账号...',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请填写密码...',
                },
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
