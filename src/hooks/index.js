// 提供复用逻辑的函数 (钩子)
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
/**
 * 数据懒加载
 * @param {Object} target 监听的DOM元素
 * @param {Function} apiFn api函数
 */
export const useLazuData = (target, apiFn) => {
  const result = ref([])
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    }
  )
  return result
}
