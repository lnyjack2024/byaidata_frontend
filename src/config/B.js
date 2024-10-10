/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-10-09 17:14:06
 * @LastEditTime: 2024-10-10 12:59:24
 */
import { AppstoreOutlined,ContainerOutlined,DesktopOutlined,PieChartOutlined,MailOutlined,CalendarOutlined } from '@ant-design/icons';

export const items = [
    {
        key: '/page',
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
            }
        ]
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
    }
]