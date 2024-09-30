/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-29 16:31:50
 * @LastEditTime: 2024-09-30 20:45:38
 */
import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import HeaderNav from '../../components/header'
// import LeftNav from '../../components/left-nav'
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    PieChartOutlined,
    MailOutlined,
    CalendarOutlined,
    SettingOutlined
  } from '@ant-design/icons';
  import logo from '../../assets/images/logoMG.jpg'
  
const contentStyle = {
textAlign: 'center',
minHeight: 120,
lineHeight: '120px',
color: 'red',
};
const footerStyle = {
textAlign: 'center',
color: '#ccccc',
backgroundColor:'#FFFFFF',
height:'60px',
};
const layoutStyle = {
overflow: 'hidden',
maxWidth: '100%',
height:'1000px',
};
const { Header, Footer, Sider, Content } = Layout;

const items = [
    {
      key: '/',
      icon: <PieChartOutlined />,
      label: '首页',
    },
    {
      key: '/person',
      label: '人员管理',
      icon: <DesktopOutlined />,
      children: [
        {
          key: '/person/section',
          label: '部门列表',
        },
        {
          key: '/person/roster',
          label: '人员花名册',
        },
        {
          key: '/person/portrait',
          label: '人员画像',
        },
        {
          key: '/person/dimission',
          label: '离职人员列表',
        },
        {
          key: '/person/black',
          label: '人员黑名单列表',
        },
        {
          key: '/person/clocking',
          label: '人员考勤列表',
        },
        {
          key: '/person/trainer',
          label: '培训师列表',
        },
      ],
    },
    {
      key: '/items',
      label: '项目管理',
      icon: <MailOutlined />,
      children: [
        {
          key: '/items/item',
          label: '项目列表'
        },
        {
          key: '/items/account',
          label: '对账列表',
        }
      ]
    },
    {
      key: '/tasks',
      label: '任务包管理',
      icon: <CalendarOutlined />,
      children: [
        {
          key: '/tasks/task',
          label: '任务包列表',
        }
      ]
    },
    {
      key: '/finance',
      label: '财务管理',
      icon: <AppstoreOutlined />,
      children: [
        {
          key: '/finance/settle',
          label: '结算列表',
        }
      ]
    },
    {
      key: '/performances',
      label: '绩效管理',
      icon: <ContainerOutlined />,
      children: [
        {
          key: '/performances/performance_zj',
          label: '字节绩效列表',
        }
      ]
    },
    {
      key: '/auth',
      icon: <SettingOutlined />,
      label: '权限管理',
      children: [
        {
          key: '/auth/user',
          label: '操作员列表',
        },
        {
          key: '/auth/role',
          label: '角色列表',
        }
      ]
    },
];
const Home = () => {
    const navigate = useNavigate();
    // const { pathname } = useLocation(); // 获取当前url

    const onClickData = (e) => {
        navigate(e.key)
    }
    
  return (
    <Layout style={layoutStyle}>
        <Sider>
        {/* <LeftNav /> */}
        <div>
            <header style={{color:'white',display:'flex',alignItems:'center', height:'80px'}}>
                <img src={logo} alt='logo' style={{width:'50px', height:'50px',margin:'0 15px'}}/>
                <h1>本原智数系统</h1>
                </header>
                <Menu
                    defaultSelectedKeys={['/']}
                    defaultOpenKeys={['/']}
                    mode="inline"
                    theme="dark"
                    items={items}
                    onClick={onClickData}
                />
        </div>
        </Sider>
        <Layout>
        <Header>
            <HeaderNav/>
        </Header>
        <Content style={contentStyle}>
            <Outlet />
        </Content>
        <Footer style={footerStyle}>推荐使用谷歌浏览器、欢迎使用本原智数系统...</Footer>
        </Layout>
    </Layout>
  )
}

export default Home
