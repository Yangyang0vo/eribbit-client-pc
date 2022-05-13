<div class="xtx-bread">
    <slot />
  </div>
<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render() {
    // 1. template 标签去掉 单文件组件
    // 2. 返回值就是组件内容
    // 3. vue 2.0 的h 函数传参进来的 vue3.0 的h函数 导入进来
    // 4. h 第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 字节点
    // 需求
    // 1.创建xtx-brand父容器
    // 2.获取默认插槽内容
    // 3.去除xtx-bread-item 组件的 i 应有render函数来组织
    // 4.遍历插槽中的item得到一个动态创建的节点 最后一个item不加i标签
    // 5.把动态创建的节点渲染在xtx-bread标签中
    // 通过this.$slots 获取到插槽元素 default是默认插槽
    const items = this.$slots.default()
    // 创建一个空的新数组
    const dymanicItems = []
    // 遍历插槽元素数组
    items.forEach((item, i) => {
      // 往新数组里追加元素
      dymanicItems.push(item)
      // 判断是否是最后一个插槽元素 如果是 不添加i标签 如果不是 添加i标签
      if (i < items.length - 1) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
