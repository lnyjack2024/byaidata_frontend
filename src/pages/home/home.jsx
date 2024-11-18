/*
 * @Description: 登录展示页
 * @Author: wangyonghong
 * @Date: 2024-09-29 16:31:50
 * @LastEditTime: 2024-11-18 11:30:14
 */
import React from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils'
import { Layout, Menu } from 'antd';
import HeaderNav from '../../components/header'
import logo from '../../assets/images/logoMG.jpg'
import { AccountBookOutlined,
         ContainerOutlined,
         UsergroupAddOutlined,
         PieChartOutlined,
         AppstoreAddOutlined,
         CalendarOutlined,
         SettingOutlined,
         ClusterOutlined,
         FileTextOutlined
       } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const Home = () => {
  const navigate = useNavigate()
  const role = storageUtils.getRole()
  let items = []
  //7:开发人员 1：管理者 15:财务部 5:人事部 3:运营部门
  if(role === 7){
    items = [
      {
          key: '/page',
          icon: <PieChartOutlined />,
          label: '首页',
      },
      {
          key: '/person',
          label: '人员管理',
          icon: <UsergroupAddOutlined />,
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
                  key: '/person/dimission',
                  label: '人员花名册-离职',
              },
              {
                  key: '/person/black',
                  label: '人员花名册-黑名单',
              },
              {
                  key: '/person/portrait',
                  label: '人员画像',
              },
              {
                  key: '/person/clocking',
                  label: '人员考勤列表',
              },
              {
                  key: '/person/trainer',
                  label: '培训师列表',
              }
          ]
      },
      {
          key: '/items',
          label: '项目管理',
          icon: <AppstoreAddOutlined />,
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
          icon: <AccountBookOutlined />,
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
          key: '/config',
          label: '配置管理',
          icon: <ClusterOutlined />,
          children: [
              {
                  key: '/config/service_line',
                  label: '业务线列表',
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
      {
        key: '/logs',
        icon: <FileTextOutlined />,
        label: '日志管理',
        children: [
            {
                key: '/logs/log',
                label: '日志列表',
            }
        ]
    },
    ]
  }else if(role === 1){
    items = [
      {
          key: '/page',
          icon: <PieChartOutlined />,
          label: '首页',
      },
      {
          key: '/person',
          label: '人员管理',
          icon: <UsergroupAddOutlined />,
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
                  key: '/person/dimission',
                  label: '人员花名册-离职',
              },
              {
                  key: '/person/black',
                  label: '人员花名册-黑名单',
              },
              {
                  key: '/person/portrait',
                  label: '人员画像',
              },
              {
                  key: '/person/clocking',
                  label: '人员考勤列表',
              },
              {
                  key: '/person/trainer',
                  label: '培训师列表',
              }
          ]
      },
      {
          key: '/items',
          label: '项目管理',
          icon: <AppstoreAddOutlined />,
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
          icon: <AccountBookOutlined />,
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
      }
    ]
  }else if(role === 5){
    items = [
      {
          key: '/page',
          icon: <PieChartOutlined />,
          label: '首页',
      },
      {
          key: '/person',
          label: '人员管理',
          icon: <UsergroupAddOutlined />,
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
                  key: '/person/dimission',
                  label: '人员花名册-离职',
              },
              {
                  key: '/person/black',
                  label: '人员花名册-黑名单',
              },
              {
                  key: '/person/portrait',
                  label: '人员画像',
              },
              {
                  key: '/person/clocking',
                  label: '人员考勤列表',
              },
              {
                  key: '/person/trainer',
                  label: '培训师列表',
              }
          ]
      }
    ]
  }else if(role === 15){
    items = [
      {
          key: '/page',
          icon: <PieChartOutlined />,
          label: '首页',
      },
      {
          key: '/finance',
          label: '财务管理',
          icon: <AccountBookOutlined />,
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
      }
    ]
  }else{
  }
  const { pathname } = useLocation(); // 获取当前url

  const onClickData = (e) => {
      navigate(e.key)
  }

  return (
    <Layout style={{overflow: 'hidden',maxWidth: '100%',height:'1000px'}}>
        <Sider>
        <div>
            <header style={{color:'white',display:'flex',justifyContent:'flex-start', alignItems:'center', height:'80px'}}>
                <img src={logo} alt='logo' style={{width:'50px', height:'50px',margin:'0 20px'}}/>
                <p style={{fontSize:'15px',fontWeight:'bold'}}>上海本原</p>
            </header>
                <Menu
                    selectedKeys={[pathname]}
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
        <Content style={{textAlign: 'center',minHeight: 120,lineHeight: '120px',color: 'red'}}>
            <Outlet />
        </Content>
        {/* <Footer style={{textAlign: 'center',color: '#ccccc',height:'60px',paddingTop:'15px'}}>推荐使用谷歌浏览器、欢迎使用本原智数系统...</Footer> */}
        </Layout>
    </Layout>
  )
}

export default Home
