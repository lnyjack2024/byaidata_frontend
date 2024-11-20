/*
 * @Description: login页
 * @Author: wangyonghong
 * @Date: 2024-08-29 16:44:35
 * @LastEditTime: 2024-11-20 16:07:21
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api/index'
import logo from '../../assets/images/chrome.png'
export default function Login() {
    const navigate = useNavigate();
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
      setHeight(window.innerHeight * 1); //动态设置表格高度为屏幕的高度
    },[])

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
        <div style={{backgroundColor:'#2e7fff'}}>
          <div style={{height:height,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{backgroundColor:'#fff',width:'700px',height:'400px',borderRadius:'10px',border: '1px solid #ccc',boxShadow:'0 2px 10px #ccc'}}>
              <div style={{height:'400px', display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Form 
                  onFinish={onFinish} 
                >
                  <div style={{fontSize:'30px',fontWeight:'bold',marginBottom:'20px',color:'#808080'}}>上海本原智数管理系统</div>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '请填写账号...',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="账号" style={{width:'300px'}}/>
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
                  <div style={{color:'#ccc'}}>
                    <span style={{verticalAlign:'middle'}}>请点击下载谷歌浏览器：</span>
                    <a href='https://www.google.com/chrome/' target="_blank" rel="noopener noreferrer">
                      <img src={logo} alt='logo' style={{width:'25px', height:'25px',verticalAlign:'middle'}}/>
                    </a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )
}
