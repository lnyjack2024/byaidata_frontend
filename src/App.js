/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-16 22:56:16
 * @LastEditTime: 2024-10-24 10:11:15
 */
import React, { Component } from 'react'
import { RouterProvider } from 'react-router-dom';
import router from './router'

export default class App extends Component {
  render() {
    return (
        <div>
           <RouterProvider router={router} />
        </div>
    )
  }
}



