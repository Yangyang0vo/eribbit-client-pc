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

/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * 获取首页-新鲜好物
 * @returns Promise
 */
export const findNew = () => {
  return request('home/new', 'get')
}

/**
 * 获取首页-人气推荐
 * @returns Promise
 */
export const findHot = () => {
  return request('home/hot', 'get')
}

/**
 *
 * @returns 首页-产品区块
 */
export const findGoods = () => {
  return request('home/goods', 'get')
}

/**
 *
 * @returns 首页-最新专题
 */
export const findSpecial = () => {
  return request('home/special', 'get')
}
