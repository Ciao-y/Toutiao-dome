<template>
  <div>
    <van-icon
      :color="value == 1 ? '#ffa500' : '#777'"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      @click="onCllect"
      :loading="loading"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { addLike, deletLike } from '@/api/article'
export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    CollectId: {
      type: [Number, String, Object],
      required: true
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
    async onCllect () {
      this.loading = true
      try {
        // 默认是-1没有点赞的状态
        let suatus = -1
        if (this.value === 1) {
          await deletLike(this.CollectId)
        } else {
          // 找不到对应Id
          await addLike(this.CollectId)
          suatus = 1
        }
        this.$emit('input', suatus)
        this.$toast.success(suatus === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败,请重试')
      }
      this.loading = false
    }
  }
}

</script>
<style scoped></style>
