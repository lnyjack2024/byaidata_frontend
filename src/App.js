/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-16 22:56:16
 * @LastEditTime: 2024-08-27 18:26:53
 */
import React, { Component } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/home' Component={Home}></Route>
          <Route path='/' Component={Login}></Route>
        </Routes>
      </BrowserRouter>
      )
  }
}



