<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter" />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="changeSort" />
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup() {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完成
    const finished = ref(false)
    // 商品列表数据
    const goodsList = ref([])

    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }

    const getData = () => {
      loading.value = true
      // 设置二级分类的id
      reqParams.category = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          // 有数据就追加数据
          goodsList.value.push(...result.items)
          // 页码值加一
          reqParams.page++
        } else {
          // 加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    // 切换二级分类重新加载
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === '/category/sub/' + newVal) {
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
        }
      }
    )
    // 1.更改排序组件的筛选数据 重新请求
    // 监听排序改变
    const changeSort = (sortParams) => {
      // console.log(sortParams)
      finished.value = false
      // 合并请求参数 ，保留之前参数
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }

    // 2.更改筛选组件的筛选数据 重新请求
    const changeFilter = (filterParams) => {
      console.log(filterParams)
      finished.value = false
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
    }
    return {
      getData,
      loading,
      finished,
      goodsList,
      changeSort,
      changeFilter
    }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}

</style>
