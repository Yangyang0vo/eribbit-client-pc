//  提供首页相关API 函数
import request from '@/utils/request'

/**
 *
 * @param {Integer} limit - 品牌个数
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
