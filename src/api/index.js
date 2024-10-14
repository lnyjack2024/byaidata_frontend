/*
 * @Description: 前端请求api集合
 * @Author: wangyonghong
 * @Date: 2024-09-25 09:51:56
 * @LastEditTime: 2024-10-14 15:34:16
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

//人员管理-部门列表
export const reqGetDepartmentDatas = (e) => reqApi( BASE + '/person/department', e, 'GET')

//部门列表-删除
export const reqDeleteDepartmentDatas = (data) => reqApi( BASE + '/person/department/delete', data, 'POST')

//人员管理-人员花名册
//查询
export const reqGetRosterDatas = (data) => reqApi( BASE + '/person/roster/search', data, 'GET')

//新增
export const reqAddRosterDatas = (data) => reqApi( BASE + '/person/roster/add', data, 'POST')

//编辑
export const reqEditRosterDatas = (data) => reqApi( BASE + '/person/roster/edit', data, 'POST')

