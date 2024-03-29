<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" @click="changeItem(item)" v-for="item in currList" :key="item.code">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      default: '',
      type: String
    }
  },
  setup(props, { emit }) {
    // 显示隐藏数据
    const visible = ref(false)

    // 所有省市区数据
    const allCityData = ref([])
    const loading = ref(false)
    //  提供打开和关闭的方法
    const open = () => {
      visible.value = true
      // 获取地区数据
      loading.value = true
      getCityData().then((data) => {
        allCityData.value = data
        loading.value = false
      })
      // 清空之前的选择
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    }
    const close = () => {
      visible.value = false
    }
    // 提供一个切换的函数
    const toggle = () => {
      visible.value ? close() : open()
    }
    //  实现点击组件外部元素关闭对话框
    const target = ref(null)
    onClickOutside(target, () => {
      // 参数1. 监听哪个元素
      // 参数2.回调函数 点外部后干什么事情
      close()
    })
    // 实现计算属性：获取当前显示的地区数组
    const currList = computed(() => {
      // 默认省一级
      let list = allCityData.value
      // 市一级
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find((p) => p.code === changeResult.provinceCode).areaList
      }
      // 可能 ：县地区一级
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find((c) => c.code === changeResult.cityCode).areaList
      }
      return list
    })
    //  定义选择的 省市区 数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })
    // 点击按钮的时候
    const changeItem = (item) => {
      if (item.level === 0) {
        // 省
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        // 市
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        // 区
        changeResult.countyCode = item.code
        changeResult.countyName = item.name
        // 这是最后一级 选完了 关闭对话框 通知父组件数据
        close()
        // 完整路径
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        emit('change', changeResult)
      }
    }
    return { visible, toggle, target, loading, currList, changeItem }
  }
}
//  获取省市区数据函数
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const getCityData = () => {
  // 1. 当本地没有缓存 发送请求获取数据
  // 2. 当本地又缓存 取出数据
  // 返回promise在then获取数据 这里可能是异步数据可能是同步数据
  return new Promise((resolve, reject) => {
    // 约定： 数据存储在window的cityDate字段
    if (window.cityDate) {
      resolve(window.cityDate)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then((res) => {
        // 将数据存储在window中
        window.cityDate = res.data
        resolve(res.data)
      })
    }
  })
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    // loading 加载中效果
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
