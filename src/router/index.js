/*
 * @Description: 路由配置文件
 * @Author: wangyonghong
 * @Date: 2024-09-30 10:15:55
 * @LastEditTime: 2024-10-21 16:08:58
 */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Page from '../pages/page/page'
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
import Performance_zj from '../pages/performance_management/performance_zj'
import User from '../pages/auth_management/user'
import Role from '../pages/auth_management/role'
import ServiceLine from '../pages/auth_management/service_line'

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
                element:<Navigate to='page' replace/>
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
                    },
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
                        path:'performance_zj',
                        Component:Performance_zj,
                    }
                ]
            },
            {
                path:'config',
                children:[
                    {
                        path:'service_line',
                        Component:ServiceLine,
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
        ]
    }
]

export default createBrowserRouter(routes)