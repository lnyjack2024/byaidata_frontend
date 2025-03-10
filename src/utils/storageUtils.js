/*
 * @Description: 储存登录用户信息
 * @Author: wangyonghong
 * @Date: 2024-09-27 16:48:55
 * @LastEditTime: 2025-02-26 17:08:35
 */
const store = require('store')
const USER_KEY = 'user_key'
const myStore = {
    saveUser(user){
        store.set(USER_KEY,user)
    },
    saveRole(role){
        store.set('role',role)
    },
    saveRoleName(roleName){
        store.set('roleName',roleName)
    },
    getUser(){
        return store.get(USER_KEY)
    },
    getRole(){
        return store.get('role')
    },
    getRoleName(){
        return store.get('roleName')
    },
    removeUser(){
        store.remove(USER_KEY)
    },
    removeRole(){
        store.remove('role')
    },
    removeRoleName(){
        store.remove('roleName')
    },
    saveToken(token){
        localStorage.setItem('TOKEN',token)
    },
    getToken(){
        return localStorage.getItem('TOKEN')
    }
}

export default myStore;