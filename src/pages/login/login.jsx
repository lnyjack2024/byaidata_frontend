/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-29 16:44:35
 * @LastEditTime: 2024-08-29 18:48:30
 */
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils'

export default function Login() {
    const navigate = useNavigate();
    const onFinish =(values) => {
        const { username, password } = values

        if(username === 'wyh' && password === 'admin'){
            message.success('登录成功...')
            memoryUtils.user = username
            navigate('/')
        }else{
          message.error('账户密码错误...')
        }
    }
    return (
        // <div className='login'>
        <div style={{width:'100%',height:'100%',display:'flex'}}>
          <div style={{height: '500px',width:'500px',margin:'auto',paddingLeft:'60px',paddingTop:'80px'}}>
          <div style={{paddingLeft:'65px',paddingBottom:'30px',fontSize:'30px',fontWeight:'bold'}}>本原智数管理系统</div>
          <Form style={{ maxWidth: 360 }} onFinish={onFinish} >
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
