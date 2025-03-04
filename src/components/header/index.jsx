/*
 * @Description: 修改密码、退出
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:17
 * @LastEditTime: 2025-03-03 16:26:50
 */
import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Button, Modal, Form, Input, message } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { LoginOutlined} from '@ant-design/icons'
import { reqEditPasswordDatas } from '../../api/index'

export default function Header() {
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ form ] = Form.useForm();
  const [ messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate()
  const logout = () => {
    storageUtils.removeUser('user_key')
    storageUtils.removeRole('role')
    storageUtils.removeRoleName('roleName')
    navigate('/login')
    window.location.reload(); //强制刷新
  }
 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then( async (val)=>{
      const password = val.password;
      if(!validatePassword(password)) {
        message.error('密码必须包含字母和数字、且长度为8-20位');
        return;
      }
      const result = await reqEditPasswordDatas({'password':password})
      if(result.status === 1){
        setIsModalVisible(false);
        form.resetFields()
        message.info('密码修改成功...')
      }else{
        message.error('密码修改失败...')
      }
      }).catch(()=>{
        messageApi.error('参数有误...请检查!!!')
      })
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return passwordRegex.test(value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  
  const items = [
    {
      key: '1',
      label: (
        <a 
          onClick={showModal}
          style={{ cursor: 'pointer' }}
          target="_blank" 
          rel="noopener noreferrer"
        >
          修改密码
        </a>
      ),
    },
  ]

  const username = memoryUtils.user
  if(username === undefined){
    return <Navigate to='/login' replace/>
  }
 
  return (
    <div style={{ height:'70px', color:'white',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
      <Dropdown
        menu={{items}}
      >
        <Avatar style={{ backgroundColor: '#1677FF' }} icon={<UserOutlined />} />
      </Dropdown>
      <div style={{marginLeft:'10px',fontWeight:'bold', width:'100px'}}>
        你好 ! { username } ...
      </div>
      <div style={{marginLeft:'20px',paddingTop:'5px'}}>
        <Button type='primary' danger style={{borderRadius:'20px',fontWeight:'bold',backgroundColor:'#a82a2e'}} onClick={()=> logout()}>
          <LoginOutlined /> 退出
        </Button>
      </div>
      {contextHolder}
      <Modal
        title="修改密码"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='确定'
        cancelText='取消'
        centered={true}
        maskClosable={false}
        width={'40%'}
      >
        <Form
          form={form}
          labelAlign='left'
          labelCol={{span:3}} 
          wrapperCol={{span:15}} 
          style={{marginTop:'30px'}}
        >
          <Form.Item
            label='新密码'
            name="password"
            rules={[{required:true,message:'请输入新密码'}]}
          >
            <Input placeholder='密码必须包含字母和数字、且长度为8-20位' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

