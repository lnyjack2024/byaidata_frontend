/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:50
 * @LastEditTime: 2024-08-30 14:46:53
 */
import React, { Component } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
// import logo from '../../assets/images/byaidata.jpg'
import './index.css'
const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: '首页',
  },
  {
    key: 'sub1',
    label: '人员管理',
    icon: <DesktopOutlined />,
    children: [
      {
        key: '3',
        label: '人员花名册',
      },
      {
        key: '4',
        label: '人员画像',
      },
      {
        key: '5',
        label: '人员考勤',
      },
      {
        key: '6',
        label: '人员新建',
      },
      {
        key: '7',
        label: '人员招聘',
      },
      {
        key: '8',
        label: '培训师',
      },
    ],
  },
  {
    key: 'sub2',
    label: '任务包管理',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: '任务包列表',
      },
      {
        key: '10',
        label: '任务包新建',
      },
      {
        key: '11',
        label: '任务包质量进度',
      },
      {
        key: '12',
        label: '任务包关联业务员',
      },
      {
        key: '13',
        label: '任务包每日信息',
      },
      {
        key: '14',
        label: '任务包交付',
      },
    ],
  },
  {
    key: '2',
    icon: <ContainerOutlined />,
    label: '权限管理',
  },
];
export default class LeftNav extends Component {
  render() {
    return (
      <div >
        <header className='left-nav-header'>
          {/* <img src={logo} alt='logo'/> */}
        </header>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center', height:'800px'}}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              // inlineCollapsed={collapsed}
              items={items}
            />
        </div>
      </div>
    )
  }
}
