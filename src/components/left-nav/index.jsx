/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-30 11:37:50
 * @LastEditTime: 2024-09-27 17:06:00
 */
import React, { Component } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
  MailOutlined,
  CalendarOutlined,
  SettingOutlined
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
        label: '部门列表',
      },
      {
        key: '4',
        label: '人员花名册',
      },
      {
        key: '5',
        label: '人员画像',
      },
      {
        key: '6',
        label: '离职人员列表',
      },
      {
        key: '7',
        label: '人员黑名单列表',
      },
      {
        key: '8',
        label: '人员考勤列表',
      },
      {
        key: '9',
        label: '培训师列表',
      },
    ],
  },
  {
    key: 'sub2',
    label: '项目管理',
    icon: <MailOutlined />,
    children: [
      {
        key: '10',
        label: '项目列表',
      },
      {
        key: '11',
        label: '对账列表',
      }
    ]
  },
  {
    key: 'sub3',
    label: '任务包管理',
    icon: <CalendarOutlined />,
    children: [
      {
        key: '12',
        label: '任务包列表',
      }
    ]
  },
  {
    key: 'sub4',
    label: '财务管理',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: '13',
        label: '结算列表',
      }
    ]
  },
  {
    key: 'sub5',
    label: '绩效管理',
    icon: <ContainerOutlined />,
    children: [
      {
        key: '14',
        label: '字节绩效列表',
      }
    ]
  },
  {
    key: 'sub6',
    icon: <SettingOutlined />,
    label: '权限管理',
    children: [
      {
        key: '15',
        label: '操作员列表',
      },
      {
        key: '16',
        label: '角色列表',
      }
    ]
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
              defaultOpenKeys={['1']}
              mode="inline"
              theme="dark"
              // collapsed={false}
              items={items}
            />
        </div>
      </div>
    )
  }
}
