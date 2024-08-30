/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-20 17:15:33
 * @LastEditTime: 2024-08-29 18:38:42
 */
import React, { Component } from 'react'

import memoryUtils from '../../utils/memoryUtils'

export default class Home extends Component {
  render() {
    const user = memoryUtils.user
    return (
      <div>
        你好！{user}
      </div>
    )
  }
}
