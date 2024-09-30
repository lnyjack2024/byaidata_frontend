/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-16 22:56:16
 * @LastEditTime: 2024-09-30 13:32:09
 */
import React, { Component } from 'react'
import { RouterProvider } from 'react-router-dom';
// import Handsontable from './pages/exce-dome/handsontable_f';
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



