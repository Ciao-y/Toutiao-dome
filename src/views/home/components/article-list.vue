<template article-list>
  <div class="article-list">
   <!-- 文章列表组件 -->
   <van-pull-refresh
   v-model="isLoading"
    @refresh="onRefresh"
     :success-text="success"
     success-duration="1000">
   <van-list
   :error.sync="error"
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
><Aeticleitem  v-for="(article ,index) in list" :key="index"
:article="article"/>
<!-- article.art_id -->
  <!-- <van-cell
  v-for="(article,index) in list" :key="index"
  :title="article.title" /> -->
</van-list>
</van-pull-refresh>

  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { Aeticle } from '../../../api/article'
import Aeticleitem from '@/components/article-item.vue'

export default {
// import 引入的组件需要注入到对象中才能使用
  // eslint-disable-next-line vue/no-unused-components
  components: { Aeticleitem },
  props: {
    obj: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    // 这里存放数据
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 列表加载提示状态
      isLoading: false, // 控制下拉刷新的loding状态
      success: '刷新成功' // 下拉刷新成功的提示
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //  onLoad () {
    //    // 异步更新数据
    //    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //    setTimeout(() => {
    //      for (let i = 0; i < 10; i++) {
    //        this.list.push(this.list.length + 1)
    //      }

    //      // 加载状态结束
    //      this.loading = false

    //      // 数据全部加载完成
    //      if (this.list.length >= 40) {
    //        this.finished = true
    //      }
    //    }, 1000)
    //  }
    async onLoad () {
      try {
        const { data } = await Aeticle({
          channel_id: this.obj.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 当前时间
          with_top: 0// 是否包含置顶文章 1包含 0 不包含
        })
        // 解构
        const { results } = data.data
        // 请求的数据放到list
        this.list.push(...results)
        // console.log(this.list)
        // 本次加载结束后设置为false
        this.loading = false
        // 判断数据是否加载完成
        if (results.lengsh) {
          // 更新获取下一页的时间戳
        } else {
          // 没有数据了 将finisshed设置true 不在load 更多了
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        console.log('请求失败', err)
        this.error = true
        // 请求失败了 lodaing 也需要关闭
        this.loading = false
      }
    },
    // 当下拉刷新的时候会触发该函数
    async onRefresh () {
      // 1. 请求数据 追加到顶部
      try {
        const { data } = await Aeticle({
          channel_id: this.obj.id, // 频道id
          timestamp: Date.now(), // 下拉刷新每次獲取最数据 传递当前最新时间戳
          with_top: 1 // 是否包含置顶文章 1包含 0 不包含
        })
        // 2.将数据 追加到最顶部
        const { results } = data.data
        this.list.unshift(...results)
        // console.log(data)
        // 3.关闭下拉刷新的状态
        this.isLoading = false
        // 4.更新下拉刷新提示成功的文本
        this.success = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.success = '刷新失败'
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted () {},
  // 生命周期 - 创建之前
  beforeCreate () {},
  // 生命周期 - 挂载之前
  beforeMount () {},
  // 生命周期 - 更新之前
  beforeUpdate () {},
  // 生命周期 - 更新之后
  updated () {},
  // 生命周期 - 销毁之前
  beforeDestroy () {},
  // 生命周期 - 销毁完成
  destroyed () {}
}
</script>
<style scoped lang="less">
.article-list{
  height: 79vh;
  overflow: auto;
}
</style>
