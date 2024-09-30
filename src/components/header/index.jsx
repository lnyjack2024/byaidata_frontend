/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:17
 * @LastEditTime: 2024-09-29 13:58:55
 */
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import memoryUtils from '../../utils/memoryUtils'

export default class Header extends Component {
  render() {
    const username = memoryUtils.user
    if(!username){
      return <Navigate to='/login' replace/>
    }
    return (
      <div style={{ height:'70px', color:'white',display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <h1 style={{marginLeft:'10px'}}>欢迎登录... { username }</h1>
      </div>
    )
  }
}
