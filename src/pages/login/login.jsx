/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-29 16:44:35
 * @LastEditTime: 2024-10-09 15:43:14
 */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api/index'

export default function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const response = await reqLogin(values)
        const username = response?.data?.[0].name
        const role_id = response?.data?.[0].role_id
        if(response.status === 1){
            message.success('登录成功...')
            memoryUtils.user = username
            storageUtils.saveUser(username)
            storageUtils.saveRole(role_id)
            storageUtils.saveToken(response.token)
            navigate('/')
        }else{
          message.error('账户密码错误...')
        }
    }
   
    return (
        <div style={{width:'100%',height:'100%',display:'flex'}}>
          <div style={{height: '500px',width:'500px',margin:'auto',paddingLeft:'60px',paddingTop:'250px'}}>
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
