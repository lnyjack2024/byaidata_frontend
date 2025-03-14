/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2025-03-10 14:26:15
 * @LastEditTime: 2025-03-14 10:55:50
 */
import { useEffect } from 'react';

const useAuthCheck = () => {
  useEffect(() => {
    const checkTokenExpiry = (isInitialLoad = false) => {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      const token = localStorage.getItem('TOKEN');

      if(token && tokenExpiry && Date.now() > Number(tokenExpiry)) {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('tokenExpiry');

        //如果是首次加载页面，则不弹框提醒
        if(!isInitialLoad){
          alert('登录已过期、请重新登录!!!');
        }
        
        window.location.href = '/login';
      }
    };

    //每次页面加载时检查 Token 是否过期
    checkTokenExpiry(true);

    //设置定时器，每隔一段时间检查 Token 是否过期
    const interval = setInterval(() => checkTokenExpiry(), 60 * 1000); // 每分钟检查一次

    //清除定时器
    return () => clearInterval(interval);
  }, []);
};

export default useAuthCheck;
