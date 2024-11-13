/*
 * @Description: 前端请求api集合
 * @Author: wangyonghong
 * @Date: 2024-09-25 09:51:56
 * @LastEditTime: 2024-11-13 14:15:15
 */
import reqApi from "./requestApi";
import { BASE } from '../utils/networkUrl'

//登录
export const reqLogin = (data) => reqApi( BASE + '/api/login', data, 'POST' )

//权限管理-操作员列表-查询
export const reqGetUserDatas = (data) => reqApi( BASE + '/api/user/search', data, 'GET')

//权限管理-操作员列表-新增
export const reqAddUserDatas = (data) => reqApi( BASE + '/api/user/add', data, 'POST')

//权限管理-操作员列表-删除
export const reqDeleteUserDatas = (data) => reqApi( BASE + '/api/user/delete', data, 'POST')

//权限管理-角色列表-查询
export const reqGetRoleDatas = () => reqApi( BASE + '/api/role/search', {}, 'GET')

//人员管理-部门列表
export const reqGetDepartmentDatas = (e) => reqApi( BASE + '/api/person/department', e, 'GET')

//人员管理-部门列表-新增
export const reqAddDepartmentDatas = (data) => reqApi( BASE + '/api/person/department/add', data, 'POST')

//部门列表-删除
export const reqDeleteDepartmentDatas = (data) => reqApi( BASE + '/api/person/department/delete', data, 'POST')

//人员管理-人员花名册-查询
export const reqGetRosterDatas = (data) => reqApi( BASE + '/api/person/roster/search', data, 'GET')

//人员管理-人员花名册-新增
export const reqAddRosterDatas = (data) => reqApi( BASE + '/api/person/roster/add', data, 'POST')

//人员管理-人员花名册-编辑
export const reqEditRosterDatas = (data) => reqApi( BASE + '/api/person/roster/edit', data, 'POST')

//人员管理-人员花名册-删除
export const reqDeleteRosterDatas = (data) => reqApi( BASE + '/api/person/roster/delete', data, 'POST')

//人员管理-人员画像-查询
export const reqGetPortraitDatas = (data) => reqApi( BASE + '/api/person/portrait/search', data, 'GET')

//人员管理-人员画像-新增
export const reqAddPortraitDatas = (data) => reqApi( BASE + '/api/person/portrait/add', data, 'POST')

//人员管理-人员画像-编辑
export const reqEditPortraitDatas = (data) => reqApi( BASE + '/api/person/portrait/edit', data, 'POST')

//人员管理-人员考勤
export const reqGetClockingDatas = (data) => reqApi( BASE + '/api/person/clocking/search', data, 'GET')

//人员管理-人员考勤-新增
export const reqAddClockingDatas = (data) => reqApi( BASE + '/api/person/clocking/add', data, 'POST')

//人员管理-人员考勤-编辑
export const reqEditClockingDatas = (data) => reqApi( BASE + '/api/person/clocking/edit', data, 'POST')

//人员管理-人员考勤-删除
export const reqDeleteClockingDatas = (data) => reqApi( BASE + '/api/person/clocking/delete', data, 'POST')

//人员管理-人员花名册-离职
export const reqGetDimissionDatas = (data) => reqApi( BASE + '/api/person/dimission/search', data, 'GET')

//人员管理-人员花名册-黑名单
export const reqGetBlackDatas = (data) => reqApi( BASE + '/api/person/black/search', data, 'GET')

//项目管理-查询
export const reqGetItemDatas = (data) => reqApi( BASE + '/api/items/item/search', data, 'GET')

//项目管理-新增
export const reqAddItemDatas = (data) => reqApi( BASE + '/api/items/item/add', data, 'POST')

//项目管理-编辑
export const reqEditItemDatas = (data) => reqApi( BASE + '/api/items/item/edit', data, 'POST')

//项目管理-删除
export const reqDeleteItemDatas = (data) => reqApi( BASE + '/api/items/item/delete', data, 'POST')

//配置管理-业务线-查询
export const reqGetServiceLineDatas = () => reqApi( BASE + '/api/config/serviceline/search', {}, 'GET')

//配置管理-业务线-新增
export const reqAddServiceLineDatas = (data) => reqApi( BASE + '/api/config/serviceline/add', data, 'POST')

//配置管理-业务线-删除
export const reqDeleteServiceLineDatas = (data) => reqApi( BASE + '/api/config/serviceline/delete', data, 'POST')

//项目管理-对账列表-查询
export const reqGetAccountDatas = (data) => reqApi( BASE + '/api/items/account/search', data, 'GET')

//项目管理-对账列表-新增
export const reqAddAccountDatas = (data) => reqApi( BASE + '/api/items/account/add', data, 'POST')

//项目管理-对账列表-明细-查询
export const reqGetAccountDetailDatas = (data) => reqApi( BASE + '/api/items/account/detail', data , 'GET')

//项目管理-对账列表-明细-新增
export const reqAddAccountDetailDatas = (data) => reqApi( BASE + '/api/items/account/detail_add', data, 'POST')

//任务包管理-查询
export const reqGetTaskDatas = (data) => reqApi( BASE + '/api/tasks/task/search', data, 'GET')

//任务包管理-人效明细-查询
export const reqGetTaskEffectDetailDatas = (data) => reqApi( BASE + '/api/tasks/task/effect_detail', data, 'GET')

//任务包管理-新增
export const reqAddTaskDatas = (data) => reqApi( BASE + '/api/tasks/task/add', data, 'POST')

//任务包管理-编辑
export const reqEditTaskDatas = (data) => reqApi( BASE + '/api/tasks/task/edit', data, 'POST')

//任务包管理-删除
export const reqDeleteTaskDatas = (data) => reqApi( BASE + '/api/tasks/task/delete', data, 'POST')

//任务包管理-详情
export const reqGetDetailDatas = (data) => reqApi( BASE + '/api/tasks/task/detail', data, 'GET')

//任务包管理-质检-详情
export const reqGetCheckDatas = (data) => reqApi( BASE + '/api/tasks/task/check', data, 'GET')

//任务包管理-质检-新增
export const reqAddCheckDatas = (data) => reqApi( BASE + '/api/tasks/task/check_add', data, 'POST')

//财务管理-结算列表-查询
export const reqGetSettleDatas = (data) => reqApi( BASE + '/api/finance/settle/search', data, 'GET')

//财务管理-结算列表-结算状态
export const reqEditSettleDatas = (data) => reqApi( BASE + '/api/finance/settle/edit', data, 'POST')

//财务管理-结算列表-回款状态
export const reqEditSettleStatus = (data) => reqApi( BASE + '/api/finance/settle/status', data, 'POST')

//财务管理-结算列表-开票明细
export const reqEditSettleInvoice = (data) => reqApi( BASE + '/api/finance/settle/invoice', data, 'POST')

//财务管理-开票明细-查询
export const reqGetInvoiceDetailDatas = (data) => reqApi( BASE + '/api/finance/settle/invoice_search', data, 'GET')

//财务管理-开票明细-删除
export const reqDeleteInvoiceDatas = (data) => reqApi( BASE + '/api/finance/settle/delete', data, 'POST')
