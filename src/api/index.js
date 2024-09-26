/*
 * @Description: 前端请求api集合
 * @Author: wangyonghong
 * @Date: 2024-09-25 09:51:56
 * @LastEditTime: 2024-09-26 16:38:17
 */
import reqApi from "./requestApi";

//handsontable测试
// export function reqHandsontableDatas({}){
//     reqApi('', {}, 'GET')
// }

//请求handsontable测试数据
export const reqHandsontableDatas = () => reqApi('http://localhost:3003/test', {}, 'GET')

//更新handsontable测试数据
export const reqHandsontableDatasUpdate = () => reqApi('http://localhost:3003/test', {}, 'POST')