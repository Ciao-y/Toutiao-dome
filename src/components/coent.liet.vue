<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="cmment_list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
      <CommentItem v-for="(item,index)
       in list"
       :key="index"
        :error="error"
        error-tetx="加载失败请点击重试"
        :comment="item"
        @reply-click="$emit('reply-click',$event)" />
    </van-list>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { CommentAPI } from '@/api/comment'
import CommentItem from '@/components/comment-item.vue'

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {
    CommentItem
  },
  props: {
    CollectId: {
      type: [Number,
        String,
        Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator (value) {
        // 传过来的数据必须包含其中之一 返回一个布尔值
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    // 这里存放数据
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10, // 获取评论的个数 不传表示用后端默认的十条
      error: false // 默认 不显示

    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  created () {
    this.loading = true
    this.onLoad()
  },
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onLoad () {
      try {
      // 请求获取数据
        const { data } = await CommentAPI({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.CollectId.toString(), // 源id 文檔的id或者評論id
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results)
        // console.log(this.list)
        this.$emit('ClickonLoad', data.data)
        // 数据添加到列表中
        // 将loading 设置为 false
        this.loading = false
        // 判断是否还有数据 有就更新下一页数据 没有就finished 设置结束 true
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}

</script>
<style scoped lang="less">
</style>
