/*
 * @Description: 前端请求api集合
 * @Author: wangyonghong
 * @Date: 2024-09-25 09:51:56
 * @LastEditTime: 2024-10-09 15:01:15
 */
import reqApi from "./requestApi";
const BASE = 'http://localhost:3003'

//请求handsontable测试数据
export const reqHandsontableDatas = () => reqApi( BASE + '/test', {}, 'GET')

//更新handsontable测试数据
export const reqHandsontableDatasUpdate = (data) => reqApi( BASE + '/test/update', data, 'POST')

//登录
export const reqLogin = (data) => reqApi( BASE + '/login', data, 'POST' )

//权限管理-操作员列表
//查询
export const reqGetUserDatas = () => reqApi( BASE + '/user/search', {}, 'GET')

//新增
export const reqAddUserDatas = (data) => reqApi( BASE + '/user/add', data, 'POST')

//权限管理-角色列表
//查询
export const reqGetRoleDatas = () => reqApi( BASE + '/role/search', {}, 'GET')
