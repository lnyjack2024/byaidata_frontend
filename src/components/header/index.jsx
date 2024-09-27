/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:17
 * @LastEditTime: 2024-09-27 19:32:23
 */
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

export default class Header extends Component {
  render() {
    const username = memoryUtils.user
    if(!username){
      return <Navigate to='/login' replace/>
    }
    return (
      <div>
        欢迎登录... { username }
      </div>
    )
  }
}
