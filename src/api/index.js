/*
 * @Description: 前端请求api集合
 * @Author: wangyonghong
 * @Date: 2024-09-25 09:51:56
 * @LastEditTime: 2025-02-05 16:06:09
 */
import reqApi from "./requestApi";
import { BASE } from '../utils/networkUrl'

//登录
export const reqLogin = (data) => reqApi( BASE + '/login', data, 'POST' )

//权限管理-操作员列表-查询
export const reqGetUserDatas = (data) => reqApi( BASE + '/user/search', data, 'GET')

//权限管理-操作员列表-新增
export const reqAddUserDatas = (data) => reqApi( BASE + '/user/add', data, 'POST')

//权限管理-操作员列表-删除
export const reqDeleteUserDatas = (data) => reqApi( BASE + '/user/delete', data, 'POST')

//权限管理-角色列表-查询
export const reqGetRoleDatas = () => reqApi( BASE + '/role/search', {}, 'GET')

//人员管理-部门列表-查询
export const reqGetDepartmentDatas = (e) => reqApi( BASE + '/person/department', e, 'GET')

//人员管理-部门列表-新增
export const reqAddDepartmentDatas = (data) => reqApi( BASE + '/person/department/add', data, 'POST')

//人员管理-部门列表-删除
export const reqDeleteDepartmentDatas = (data) => reqApi( BASE + '/person/department/delete', data, 'POST')

//人员管理-人员花名册-查询
export const reqGetRosterDatas = (data) => reqApi( BASE + '/person/roster/search', data, 'GET')

//人员管理-人员花名册-新增
export const reqAddRosterDatas = (data) => reqApi( BASE + '/person/roster/add', data, 'POST')

//人员管理-人员花名册-编辑
export const reqEditRosterDatas = (data) => reqApi( BASE + '/person/roster/edit', data, 'POST')

//人员管理-人员花名册-下载
export const reqDownRosterDatas = (data) => reqApi( BASE + '/person/roster/down', data, 'GET')

//人员管理-人员花名册-删除
export const reqDeleteRosterDatas = (data) => reqApi( BASE + '/person/roster/delete', data, 'POST')

//人员管理-人员画像-查询
export const reqGetPortraitDatas = (data) => reqApi( BASE + '/person/portrait/search', data, 'GET')

//人员管理-人员画像-新增
export const reqAddPortraitDatas = (data) => reqApi( BASE + '/person/portrait/add', data, 'POST')

//人员管理-人员画像-编辑
export const reqEditPortraitDatas = (data) => reqApi( BASE + '/person/portrait/edit', data, 'POST')

//人员管理-人员画像-删除
export const reqDeletePortraitDatas = (data) => reqApi( BASE + '/person/portrait/delete', data, 'POST')

//人员管理-人员考勤-查询
export const reqGetClockingDatas = (data) => reqApi( BASE + '/person/clocking/search', data, 'GET')

//人员管理-人员考勤-新增
export const reqAddClockingDatas = (data) => reqApi( BASE + '/person/clocking/add', data, 'POST')

//人员管理-人员考勤-编辑
export const reqEditClockingDatas = (data) => reqApi( BASE + '/person/clocking/edit', data, 'POST')

//人员管理-人员考勤-删除
export const reqDeleteClockingDatas = (data) => reqApi( BASE + '/person/clocking/delete', data, 'POST')

//人员管理-人员花名册-离职
export const reqGetDimissionDatas = (data) => reqApi( BASE + '/person/dimission/search', data, 'GET')

//人员管理-人员花名册-黑名单
export const reqGetBlackDatas = (data) => reqApi( BASE + '/person/black/search', data, 'GET')

//人员管理-培训师列表-查询
export const reqGetTrainerDatas = (data) => reqApi( BASE + '/person/trainer/search', data, 'GET')

//人员管理-培训师列表-新增
export const reqAddTrainerDatas = (data) => reqApi( BASE + '/person/trainer/add', data, 'POST')

//人员管理-培训师列表-删除
export const reqDeleteTrainerDatas = (data) => reqApi( BASE + '/person/trainer/delete', data, 'POST')

//项目管理-查询
export const reqGetItemDatas = (data) => reqApi( BASE + '/items/item/search', data, 'GET')

//项目管理-查询
export const reqGetItemsDatas = (data) => reqApi( BASE + '/items/item/search_', data, 'GET')

//项目管理-新增
export const reqAddItemDatas = (data) => reqApi( BASE + '/items/item/add', data, 'POST')

//项目管理-编辑
export const reqEditItemDatas = (data) => reqApi( BASE + '/items/item/edit', data, 'POST')

//项目管理-删除
export const reqDeleteItemDatas = (data) => reqApi( BASE + '/items/item/delete', data, 'POST')

//配置管理-业务线-查询
export const reqGetServiceLineDatas = () => reqApi( BASE + '/config/serviceline/search', {}, 'GET')

//配置管理-业务线-查询
export const reqGetServiceLineDatas_ = () => reqApi( BASE + '/config/serviceline/search_', {}, 'GET')

//配置管理-业务线-新增
export const reqAddServiceLineDatas = (data) => reqApi( BASE + '/config/serviceline/add', data, 'POST')

//配置管理-业务线-删除
export const reqDeleteServiceLineDatas = (data) => reqApi( BASE + '/config/serviceline/delete', data, 'POST')

//配置管理-基地-查询
export const reqGetBaseDatas = () => reqApi( BASE + '/config/base/search', {}, 'GET')

//配置管理-基地-查询
export const reqGetBaseDatas_ = () => reqApi( BASE + '/config/base/search_', {}, 'GET')

//配置管理-基地-新增
export const reqAddBaseDatas = (data) => reqApi( BASE + '/config/base/add', data, 'POST')

//配置管理-基地-删除
export const reqDeleteBaseDatas = (data) => reqApi( BASE + '/config/base/delete', data, 'POST')

//配置管理-结算类型-查询
export const reqGetSettlementTypeDatas = () => reqApi( BASE + '/config/settlement_type/search', {}, 'GET')

//配置管理-结算类型-新增
export const reqAddSettlementTypeDatas = (data) => reqApi( BASE + '/config/settlement_type/add', data, 'POST')

//配置管理-结算类型-删除
export const reqDeleteSettlementTypeDatas = (data) => reqApi( BASE + '/config/settlement_type/delete', data, 'POST')

//配置管理-加班类型-查询
export const reqGetOvertimeTypeDatas = () => reqApi( BASE + '/config/overtime_type/search', {}, 'GET')

//配置管理-加班类型-新增
export const reqAddOvertimeTypeDatas = (data) => reqApi( BASE + '/config/overtime_type/add', data, 'POST')

//配置管理-加班类型-删除
export const reqDeleteOvertimeTypeDatas = (data) => reqApi( BASE + '/config/overtime_type/delete', data, 'POST')

//配置管理-交付要求-查询
export const reqGetDeliveryRequirementDatas = () => reqApi( BASE + '/config/delivery_requirement/search', {}, 'GET')

//配置管理-交付要求-新增
export const reqAddDeliveryRequirementDatas = (data) => reqApi( BASE + '/config/delivery_requirement/add', data, 'POST')

//配置管理-交付要求-删除
export const reqDeleteDeliveryRequirementDatas = (data) => reqApi( BASE + '/config/delivery_requirement/delete', data, 'POST')

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

//任务包管理-查询
export const _reqGetTaskDatas = (data) => reqApi( BASE + '/tasks/task/search_', data, 'GET')

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

//任务包进度
// export const reqTaskProgressDatas = (data) => reqApi( BASE + '/tasks/task/progress', data, 'GET')

//财务管理-结算列表-查询
export const reqGetSettleDatas = (data) => reqApi( BASE + '/finance/settle/search', data, 'GET')

//财务管理-结算列表-结算状态
export const reqEditSettleDatas = (data) => reqApi( BASE + '/finance/settle/edit', data, 'POST')

//财务管理-结算列表-回款状态
export const reqEditSettleStatus = (data) => reqApi( BASE + '/finance/settle/status', data, 'POST')

//财务管理-结算列表-开票明细
export const reqEditSettleInvoice = (data) => reqApi( BASE + '/finance/settle/invoice', data, 'POST')

//财务管理-开票明细-查询
export const reqGetInvoiceDetailDatas = (data) => reqApi( BASE + '/finance/settle/invoice_search', data, 'GET')

//财务管理-开票明细-删除
export const reqDeleteInvoiceDatas = (data) => reqApi( BASE + '/finance/settle/delete', data, 'POST')

//日志管理-查询
export const reqGetLogsDatas = (data) => reqApi( BASE + '/config/logs/log', data, 'GET')

//配置管理-项目经理列表-查询
export const reqItemManagerDatas = () => reqApi( BASE + '/config/item_manager/search', {}, 'GET')

//配置管理-项目经理列表-新增
export const reqAddItemManagerDatas = (data) => reqApi( BASE + '/config/item_manager/add', data, 'POST')

//配置管理-项目经理列表-删除
export const reqDeleteItemManagerDatas = (data) => reqApi( BASE + '/config/item_manager/delete', data, 'POST')

//配置管理-组长列表-查询
export const reqGroupManagerDatas = () => reqApi( BASE + '/config/group_manager/search', {}, 'GET')

//配置管理-组长列表-新增
export const reqAddGroupManagerDatas = (data) => reqApi( BASE + '/config/group_manager/add', data, 'POST')

//配置管理-组长列表-删除
export const reqDeleteGroupManagerDatas = (data) => reqApi( BASE + '/config/group_manager/delete', data, 'POST')

//配置管理-培训师列表-查询
export const reqGetTrainersDatas = () => reqApi( BASE + '/config/trainers/search', {}, 'GET')

//配置管理-培训师列表-新增
export const reqAddTrainersDatas = (data) => reqApi( BASE + '/config/trainers/add', data, 'POST')

//配置管理-培训师列表-删除
export const reqDeleteTrainersDatas = (data) => reqApi( BASE + '/config/trainers/delete', data, 'POST')

