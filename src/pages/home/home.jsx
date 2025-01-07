/*
 * @Description: 登录展示页
 * @Author: wangyonghong
 * @Date: 2024-09-29 16:31:50
 * @LastEditTime: 2025-01-07 13:48:22
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
  //1:管理者 2:财务部 3:运营部门 4:人事部 5:开发负责人 6:产品经理 7:业务负责人/项目经理/项目主管 8:小组长以下 9:培训师
  if(role === 5){
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
                  key: '/performances/performance_xhs',
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
              },
              {
                  key: '/config/base',
                  label: '基地列表',
              },
              {
                  key: '/config/settlement_type',
                  label: '结算类型列表',
              },
              {
                  key: '/config/overtime_type',
                  label: '加班类型列表',
              },
              {
                  key: '/config/delivery_requirement',
                  label: '交付要求列表',
              },
              {
                  key: '/config/item_manager',
                  label: '项目经理列表',
              },
              {
                  key: '/config/group_manager',
                  label: '组长列表',
              },
              {
                  key: '/config/trainers',
                  label: '培训师列表',
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
  }else if( role === 1 ){
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
            //   {
            //       key: '/person/clocking',
            //       label: '人员考勤列表',
            //   },
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
        key: '/config',
        label: '配置管理',
        icon: <ClusterOutlined />,
        children: [
            {
                key: '/config/service_line',
                label: '业务线列表',
            },
            {
                key: '/config/base',
                label: '基地列表',
            },
            {
                key: '/config/settlement_type',
                label: '结算类型列表',
            },
            {
                key: '/config/overtime_type',
                label: '加班类型列表',
            },
            {
                key: '/config/delivery_requirement',
                label: '交付要求列表',
            },
            {
                key: '/config/item_manager',
                label: '项目经理列表',
            },
            {
                key: '/config/group_manager',
                label: '组长列表',
            },
            {
                key: '/config/trainers',
                label: '培训师列表',
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
    ]
  }else if( role === 3 ){
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
                // {
                //     key: '/person/clocking',
                //     label: '人员考勤列表',
                // },
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
            key: '/config',
            label: '配置管理',
            icon: <ClusterOutlined />,
            children: [
                {
                    key: '/config/service_line',
                    label: '业务线列表',
                },
                {
                    key: '/config/base',
                    label: '基地列表',
                },
                {
                    key: '/config/settlement_type',
                    label: '结算类型列表',
                },
                {
                    key: '/config/overtime_type',
                    label: '加班类型列表',
                },
                {
                    key: '/config/delivery_requirement',
                    label: '交付要求列表',
                },
                {
                    key: '/config/item_manager',
                    label: '项目经理列表',
                },
                {
                    key: '/config/group_manager',
                    label: '组长列表',
                },
                {
                    key: '/config/trainers',
                    label: '培训师列表',
                }
            ]
        }
      ]
  }else if( role === 4 ){
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
  }else if( role === 2 ){
    items = [
        {
            key: '/page',
            icon: <PieChartOutlined />,
            label: '首页',
        },
        {
            key: '/items',
            label: '项目管理',
            icon: <AppstoreAddOutlined />,
            children: [
                // {
                //     key: '/items/item',
                //     label: '项目列表'
                // },
                {
                    key: '/items/account',
                    label: '对账列表',
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
      ]
  }else if( role === 6 ){
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
                    key: '/performances/performance_xhs',
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
                },
                {
                    key: '/config/base',
                    label: '基地列表',
                },
                {
                    key: '/config/settlement_type',
                    label: '结算类型列表',
                },
                {
                    key: '/config/overtime_type',
                    label: '加班类型列表',
                },
                {
                    key: '/config/delivery_requirement',
                    label: '交付要求列表',
                },
                {
                    key: '/config/item_manager',
                    label: '项目经理列表',
                },
                {
                    key: '/config/group_manager',
                    label: '组长列表',
                },
                {
                    key: '/config/trainers',
                    label: '培训师列表',
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
        
      ]
  }else if( role === 7 ){
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
                // {
                //     key: '/person/section',
                //     label: '部门列表',
                // },
                // {
                //     key: '/person/roster',
                //     label: '人员花名册',
                // },
                // {
                //     key: '/person/dimission',
                //     label: '人员花名册-离职',
                // },
                // {
                //     key: '/person/black',
                //     label: '人员花名册-黑名单',
                // },
                {
                    key: '/person/portrait',
                    label: '人员画像',
                },
                // {
                //     key: '/person/clocking',
                //     label: '人员考勤列表',
                // },
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
            key: '/config',
            label: '配置管理',
            icon: <ClusterOutlined />,
            children: [
                {
                    key: '/config/service_line',
                    label: '业务线列表',
                },
                {
                    key: '/config/base',
                    label: '基地列表',
                },
                {
                    key: '/config/settlement_type',
                    label: '结算类型列表',
                },
                {
                    key: '/config/overtime_type',
                    label: '加班类型列表',
                },
                {
                    key: '/config/delivery_requirement',
                    label: '交付要求列表',
                },
                {
                    key: '/config/item_manager',
                    label: '项目经理列表',
                },
                {
                    key: '/config/group_manager',
                    label: '组长列表',
                },
                {
                    key: '/config/trainers',
                    label: '培训师列表',
                }
            ]
        }
      ]
  }else if( role === 8 ){
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
                    key: '/person/clocking',
                    label: '人员考勤列表',
                },
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
            key: '/config',
            label: '配置管理',
            icon: <ClusterOutlined />,
            children: [
                {
                    key: '/config/service_line',
                    label: '业务线列表',
                },
                {
                    key: '/config/base',
                    label: '基地列表',
                },
                {
                    key: '/config/settlement_type',
                    label: '结算类型列表',
                },
                {
                    key: '/config/overtime_type',
                    label: '加班类型列表',
                },
                {
                    key: '/config/delivery_requirement',
                    label: '交付要求列表',
                }
            ]
        }
      ]
  }else if( role === 9 ){
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
                    key: '/person/trainer',
                    label: '培训师列表',
                }
            ]
        }
      ]
  }else{}
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
