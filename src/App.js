/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-16 22:56:16
 * @LastEditTime: 2024-09-24 17:09:38
 */
import React, { Component } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Handsontable from './pages/exce-dome/handsontable_f';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/handsontable' element={<Handsontable />} />
        </Routes>
     </BrowserRouter>
      )
  }
}



