<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <!-- 显示的图片加上fade -->
      <li class="carousel-item" v-for="(item, i) in sliders" :key="i" :class="{ fade: index === i }">
        <!-- 图片 -->
        <RouterLink v-if="item.imgUrl" to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
        <!-- 商品列表 item=[goods1,goods2,...] -->
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:; " @click="toggle(-1)" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张 -->
    <a href="javascript:;" @click="toggle(+1)" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <!-- 小圆点 -->
    <div class="carousel-indicator">
      <!-- active 激活小圆点 -->
      <span @click="index = i" v-for="(item, i) in sliders" :key="i" :class="{ active: index === i }"></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 轮播间隔时长
    duration: {
      type: Number,
      default: 3000
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    // 默认显示的图片的索引
    const index = ref(0)
    // 自动播放
    // 1.轮播图逻辑
    let timer = null
    const autoPlayFn = () => {
      // 每隔多久切换索引
      // 防止定时器重复添加
      clearInterval(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 需要监听sliders数据变化，判断如果有数据且autoplay是true
    watch(
      () => props.sliders,
      (newVal) => {
        // 有数据&开启自动播放，才调用自动播放函数
        if (newVal.length && props.autoPlay) {
          index.value = 0
          autoPlayFn()
        }
      },
      { immediate: true }
    )

    // 2. 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }
    // 3.上一张下一张
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = index.value + step
      // 超出的情况,太大了
      if (newIndex >= props.sliders.length - 1) {
        index.value = 0
        return
      }
      // 超出的情况, 太小了
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      // 正常情况
      index.value = newIndex
    }

    // 4.组件消耗，清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })

    return { index, stop, start, toggle }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
