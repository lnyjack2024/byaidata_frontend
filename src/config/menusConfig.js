/*
 * @Description: 导航栏数据
 * @Author: wangyonghong
 * @Date: 2024-10-09 15:24:04
 * @LastEditTime: 2024-11-01 12:41:54
 */
const menuList = [
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
]

export default menuList







