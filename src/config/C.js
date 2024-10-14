/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-10-10 13:02:26
 * @LastEditTime: 2024-10-14 16:54:48
 */
import { DesktopOutlined,PieChartOutlined } from '@ant-design/icons';

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