/*
 * @Description: 路由配置文件
 * @Author: wangyonghong
 * @Date: 2024-09-30 10:15:55
 * @LastEditTime: 2025-01-17 16:14:50
 */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Page from '../pages/page/index'
import Department from '../pages/people_management/department'
import Roster from '../pages/people_management/roster'
import Portrait from '../pages/people_management/portrait'
import Dimission from '../pages/people_management/dimission'
import Black from '../pages/people_management/black'
import Clocking from '../pages/people_management/clocking'
import Trainer from '../pages/people_management/trainer'
import Item from '../pages/items_management/item'
import Account from '../pages/items_management/account'
import Task from '../pages/task_package_management/task'
import Settle from '../pages/financial_management/settle'
import Performance_xhs from '../pages/performance_management/performance_xhs'
import User from '../pages/auth_management/user'
import Role from '../pages/auth_management/role'
import ServiceLine from '../pages/auth_management/service_line'
import Base from '../pages/auth_management/base'
import SettlementType from '../pages/auth_management/settlement_type'
import OvertimeType from '../pages/auth_management/overtime_type'
import DeliveryRequirement from '../pages/auth_management/delivery_requirement'
import Logs from '../pages/auth_management/logs'
import ItemManager from '../pages/auth_management/item_manager'
import GroupManager from '../pages/auth_management/group_manager'
import Trainers from '../pages/auth_management/trainers'

const routes = [
    {
        path:'login',
        Component:Login,
    },
    {
        path:'/',
        Component:Home,
        children:[
            //重定向
            {
                path:'/',
                element:<Navigate to='login' replace/>
            },
            {
                path:'page',
                Component:Page,
            },
            {
                path:'person',
                children:[
                    {
                        path:'section',
                        Component:Department,
                    },
                    {
                        path:'roster',
                        Component:Roster,
                    },
                    {
                        path:'portrait',
                        Component:Portrait,
                    },
                    {
                        path:'dimission',
                        Component:Dimission,
                    },
                    {
                        path:'black',
                        Component:Black,
                    },
                    {
                        path:'clocking',
                        Component:Clocking,
                    }
                ]
            },
            {
                path:'train',
                children:[
                    {
                        path:'trainer',
                        Component:Trainer,
                    }
                ]
            },
            {
                path:'items',
                children:[
                    {
                        path:'item',
                        Component:Item,
                    },
                    {
                        path:'account',
                        Component:Account,
                    }
                ]
            },
            {
                path:'tasks',
                children:[
                    {
                        path:'task',
                        Component:Task,
                    }
                ]
            },
            {
                path:'finance',
                children:[
                    {
                        path:'settle',
                        Component:Settle,
                    }
                ]
            },
            {
                path:'performances',
                children:[
                    {
                        path:'Performance_xhs',
                        Component:Performance_xhs,
                    }
                ]
            },
            {
                path:'config',
                children:[
                    {
                        path:'service_line',
                        Component:ServiceLine,
                    },
                    {
                        path:'base',
                        Component:Base,
                    },
                    {
                        path:'settlement_type',
                        Component:SettlementType,
                    },
                    {
                        path:'overtime_type',
                        Component:OvertimeType,
                    },
                    {
                        path:'delivery_requirement',
                        Component:DeliveryRequirement,
                    },
                    {
                        path:'item_manager',
                        Component:ItemManager,
                    },
                    {
                        path:'group_manager',
                        Component:GroupManager,
                    },
                    {
                        path:'trainers',
                        Component:Trainers,
                    }
                ]
            },
            {
                path:'auth',
                children:[
                    {
                        path:'user',
                        Component:User,
                    },
                    {
                        path:'role',
                        Component:Role,
                    }
                ]
            },
            {
                path:'logs',
                children:[
                    {
                        path:'log',
                        Component:Logs,
                    }
                ]
            }
        ]
    }
]

export default createBrowserRouter(routes)