/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:17
 * @LastEditTime: 2024-10-17 16:56:38
 */
import React from 'react'
import { useNavigate,Navigate} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

export default function Header() {
  const navigate = useNavigate()
  const logout = () => {
    storageUtils.removeUser('user_key')
    storageUtils.removeRole('role')
    // memoryUtils.user = {}
    navigate('/login')
  }
  
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={()=> logout()} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      )
    }
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
    <div style={{marginLeft:'10px'}}>欢迎登录... { username }</div>
  </div>
  )
}

