/*
 * @Description: 储存登录用户信息
 * @Author: wangyonghong
 * @Date: 2024-09-27 16:48:55
 * @LastEditTime: 2024-09-27 19:29:42
 */
const store = require('store')
const USER_KEY = 'user_key'
const myStore = {
    //保存user
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    //读取user1
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY)
    },
    //删除user
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}

export default myStore;