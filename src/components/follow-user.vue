<template>
   <van-button
          v-if="isFolloweb"
          :loading="loading"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          :loading="loading"
            @click="onFollow"
          >关注</van-button>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { addFollowAPI, deleFollowAPI } from '@/api/index'

export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    isFolloweb: {
      type: Boolean,
      require: true
    },
    userId: {
      type: [Number, String, Object],
      require: true

    }
  },
  data () {
    // 这里存放数据
    return {
      loading: false

    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onFollow () {
      // 展示关注按钮的loading
      this.loading = true
      try {
        // 已关注 ,取消关注
        if (this.isFolloweb) {
          await deleFollowAPI(this.userId)
          //  this.article.is_followed = false
        } else {
          // 没有关注 添加关注
          await addFollowAPI(this.userId)
          //  this.article.is_followed = true
        }
        this.$emit('userId_followeb', !this.isFolloweb)
      } catch (err) {
        let message = '操作失败 请重试'
        if (err.response && err.response.status === 400) {
          message = '不能關注自己！'
        }
        this.$toast(message)
      }
      // 关闭关注按钮的标签
      this.loading = false
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
  destroyed () {},
  // 如果页面有 keep-alive 缓存功能，这个函数会触发
  activated () {}
}
</script>
<style scoped>

</style>
