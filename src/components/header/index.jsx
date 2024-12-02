/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:17
 * @LastEditTime: 2024-12-02 14:35:45
 */
import React from 'react'
import { useNavigate,Navigate} from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Button } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { LoginOutlined} from '@ant-design/icons'

export default function Header() {
  const navigate = useNavigate()
  const logout = () => {
    storageUtils.removeUser('user_key')
    storageUtils.removeRole('role')
    // memoryUtils.user = {}
    navigate('/login')
    window.location.reload(); // 强制刷新
  }
  
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          修改密码
        </a>
      ),
    },
    // {
    //   key: '2',
    //   label: (
    //     <a onClick={()=> logout()} target="_blank" rel="noopener noreferrer">
    //       退出
    //     </a>
    //   )
    // }
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
      <div style={{marginLeft:'10px',fontWeight:'bold'}}>
        你好... { username } !
      </div>
      <div style={{marginLeft:'20px',paddingTop:'5px'}}>
        <Button type='primary' danger style={{borderRadius:'20px',fontWeight:'bold',backgroundColor:'#008080'}} onClick={()=> logout()}>
          <LoginOutlined /> 退出
        </Button>
      </div>
    </div>
  )
}

