/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-10-09 15:24:04
 * @LastEditTime: 2024-10-10 10:49:59
 */
import storageUtils from '../utils/storageUtils'
let role = storageUtils.getRole()
let exportedItems

const importModule = async () => {
    if (role === 7) {
      const module = await import('./A.js');
      exportedItems = module.default;
    } else if(role === 1) {
      const module = await import('./B.js');
      exportedItems = module.default;
    }
  };

importModule();
export { exportedItems };







