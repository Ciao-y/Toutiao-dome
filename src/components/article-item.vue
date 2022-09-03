<template>
  <van-cell class="artcle_item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="right_cover"
            slot="default"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="label_info_wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate|relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
     fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)

export default {
  components: {},
  props: {
    article: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data () {
    // 这里存放数据
    return {

    }
  },

  // 计算属性 类似于 data 概念
  computed: {
  },
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {}
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
}
</script>
<style scoped lang="less">
.artcle_item {
  .tltle {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right_cover {
    width: 232px;
    height: 146px;
  }
  .label_info_wrap span{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    padding: 30px 0;
    .cover-item{
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 10px;
      }
      .right_cover{
        width: 100%;
        height: 146px;
        padding-right: 5px;

      }
    }
  }
}
</style>
