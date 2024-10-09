/*
 * @Description: 封装axios异步请求
 * @Author: wangyonghong
 * @Date: 2024-09-24 18:35:34
 * @LastEditTime: 2024-10-09 10:26:04
 */
import axios from "axios";
import { message } from 'antd'
import storageUtils from '../utils/storageUtils'

export default function reqApi( url, data = {}, type = 'GET'){
    return new Promise((resolve, reject) => {
        let promise;
        if(type === 'GET'){
           promise = axios.get(url, { 
            params : data,
            headers: {
                'token': storageUtils.getToken()
            }
        })
        }else{
            promise = axios.post(url, data, { headers: {
                'token': storageUtils.getToken()
            }})
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求异常...' + error.message)
        })
    })
}