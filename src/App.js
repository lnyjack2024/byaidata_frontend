/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-16 22:56:16
 * @LastEditTime: 2025-03-10 14:42:28
 */
import React from 'react'
import { RouterProvider } from 'react-router-dom';
import useAuthCheck from './utils/useAuthCheck';
import router from './router'

export default function App() {
  useAuthCheck();
  return (
    <div>
       <RouterProvider router={router} />
    </div>
)}
