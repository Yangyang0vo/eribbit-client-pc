// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// 加载图片失败的时候的图片
import defaultImg from '@/assets/images/200.png'
// //  骨架组件
// import XtxSkeleton from './xtx-skeleton.vue'
// // 轮播图组件
// import XtxCarousel from './xtx-carousel.vue'
// // 面板组件
// import XtxMore from './xtx-more.vue'
// // 面包屑导航
// import XtxBread from './xtx-bread.vue'
// // 面包屑item
// import XtxBreadItem from './xtx-bread-item.vue'

// 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
// 然后 context 函数会返回一个导入函数 importFn
// 它又一个属性 keys() 获取所有的文件路径
// 通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
// 遍历的同时进行全局注册即可

// context(目录路径，是否加载子目录，加载文件的匹配正则)
const importFn = require.context('./', false, /\.vue$/)
// console.log(importFn.keys())

export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      // 组件注册
      // 组件的名字 组件本身
      app.component(component.name, component)
    })
    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1. 图片懒加载指令
  // 原理：先存储图片地址不能在src上 当图片进入可视区 将你所存储的图片地址设置给图片元素即可
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好 钩子函数：inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样 钩子函数：mounted
    mounted(el, binging) {
      // el 绑定这个指令的DOM元素对象 bingding 是一个对象 表示绑定的东西
      // 2. 创建一个观察对象 来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 3.把指令的值设置给el的src binding.value就是指令的值
          // 4. 处理图片加载失败 error图片加载失败的时间 laod 图片加载成功
          el.onerror = () => {
            // 加载失败，设置默认图片
            el.src = defaultImg
          }
          el.src = binging.value
        }
      }, {
        threshold: 0
      })
      observe.observe(el)
    }
  })
}
