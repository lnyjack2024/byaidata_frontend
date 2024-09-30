/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-16 22:56:16
 * @LastEditTime: 2024-09-30 13:32:34
 */
import React from 'react';
// import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

const user = storageUtils.getUser()
memoryUtils.user = user

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <BrowserRouter>
      <App />
  //  </BrowserRouter>
  // </React.StrictMode>
);