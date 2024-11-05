/*
 * @Description: 前端请求api集合
 * @Author: wangyonghong
 * @Date: 2024-09-25 09:51:56
 * @LastEditTime: 2024-11-04 16:25:37
 */
import reqApi from "./requestApi";
const BASE = 'http://localhost:3003'

//请求handsontable测试数据
export const reqHandsontableDatas = () => reqApi( BASE + '/test', {}, 'GET')

//更新handsontable测试数据
export const reqHandsontableDatasUpdate = (data) => reqApi( BASE + '/test/update', data, 'POST')

//登录
export const reqLogin = (data) => reqApi( BASE + '/login', data, 'POST' )

//权限管理-操作员列表-查询
export const reqGetUserDatas = () => reqApi( BASE + '/user/search', {}, 'GET')

//新增
export const reqAddUserDatas = (data) => reqApi( BASE + '/user/add', data, 'POST')

//权限管理-角色列表-查询
export const reqGetRoleDatas = () => reqApi( BASE + '/role/search', {}, 'GET')

//人员管理-部门列表
export const reqGetDepartmentDatas = (e) => reqApi( BASE + '/person/department', e, 'GET')

//部门列表-删除
export const reqDeleteDepartmentDatas = (data) => reqApi( BASE + '/person/department/delete', data, 'POST')

//人员管理-人员花名册-查询
export const reqGetRosterDatas = (data) => reqApi( BASE + '/person/roster/search', data, 'GET')

//新增
export const reqAddRosterDatas = (data) => reqApi( BASE + '/person/roster/add', data, 'POST')

//编辑
export const reqEditRosterDatas = (data) => reqApi( BASE + '/person/roster/edit', data, 'POST')

//人员管理-人员画像-查询
export const reqGetPortraitDatas = (data) => reqApi( BASE + '/person/portrait/search', data, 'GET')

//新增
export const reqAddPortraitDatas = (data) => reqApi( BASE + '/person/portrait/add', data, 'POST')

//编辑
export const reqEditPortraitDatas = (data) => reqApi( BASE + '/person/portrait/edit', data, 'POST')

//人员管理-人员考勤
export const reqGetClockingDatas = (data) => reqApi( BASE + '/person/clocking/search', data, 'GET')

//人员管理-人员花名册-离职
export const reqGetDimissionDatas = (data) => reqApi( BASE + '/person/dimission/search', data, 'GET')

//人员管理-人员花名册-黑名单
export const reqGetBlackDatas = (data) => reqApi( BASE + '/person/black/search', data, 'GET')

//项目管理-查询
export const reqGetItemDatas = (data) => reqApi( BASE + '/items/item/search', data, 'GET')

//项目管理-新增
export const reqAddItemDatas = (data) => reqApi( BASE + '/items/item/add', data, 'POST')

//项目管理-编辑
export const reqEditItemDatas = (data) => reqApi( BASE + '/items/item/edit', data, 'POST')

//项目管理-删除
export const reqDeleteItemDatas = (data) => reqApi( BASE + '/items/item/delete', data, 'POST')

//配置管理-业务线-查询
export const reqGetServiceLineDatas = () => reqApi( BASE + '/config/serviceline/search', {}, 'GET')

//配置管理-业务线-新增
export const reqAddServiceLineDatas = (data) => reqApi( BASE + '/config/serviceline/add', data, 'POST')

//配置管理-业务线-删除
export const reqDeleteServiceLineDatas = (data) => reqApi( BASE + '/config/serviceline/delete', data, 'POST')

//项目管理-对账列表-查询
export const reqGetAccountDatas = (data) => reqApi( BASE + '/items/account/search', data, 'GET')

//项目管理-对账列表-新增
export const reqAddAccountDatas = (data) => reqApi( BASE + '/items/account/add', data, 'POST')

//项目管理-对账列表-明细-查询
export const reqGetAccountDetailDatas = (data) => reqApi( BASE + '/items/account/detail', data , 'GET')

//项目管理-对账列表-明细-新增
export const reqAddAccountDetailDatas = (data) => reqApi( BASE + '/items/account/detail_add', data, 'POST')

//任务包管理-查询
export const reqGetTaskDatas = (data) => reqApi( BASE + '/tasks/task/search', data, 'GET')

//任务包管理-人效明细-查询
export const reqGetTaskEffectDetailDatas = (data) => reqApi( BASE + '/tasks/task/effect_detail', data, 'GET')

//任务包管理-新增
export const reqAddTaskDatas = (data) => reqApi( BASE + '/tasks/task/add', data, 'POST')

//任务包管理-编辑
export const reqEditTaskDatas = (data) => reqApi( BASE + '/tasks/task/edit', data, 'POST')

//任务包管理-删除
export const reqDeleteTaskDatas = (data) => reqApi( BASE + '/tasks/task/delete', data, 'POST')

//任务包管理-详情
export const reqGetDetailDatas = (data) => reqApi( BASE + '/tasks/task/detail', data, 'GET')

//任务包管理-质检-详情
export const reqGetCheckDatas = (data) => reqApi( BASE + '/tasks/task/check', data, 'GET')

//任务包管理-质检-新增
export const reqAddCheckDatas = (data) => reqApi( BASE + '/tasks/task/check_add', data, 'POST')

//财务管理-结算列表-查询
export const reqGetSettleDatas = (data) => reqApi( BASE + '/finance/settle/search', data, 'GET')
