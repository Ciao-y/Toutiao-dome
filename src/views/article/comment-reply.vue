<template>
  <div class="comment_reply">
   <van-nav-bar
  :title="comment.reply_count>0?`${comment.reply_count}条回复`: '暂无回复'"
>
<van-icon slot="left" name="cross"
@click="$emit('close')"></van-icon>
</van-nav-bar>
<div class="scroll_wrap">
  <!-- 当前评论项 -->
<commentItem
:comment="comment"
/>
<!-- 当前评论项 / -->
<!-- 评论的回复列表 -->
<van-cell title="全部回复"></van-cell>
<CmmentList
:list="commentList"
:CollectId="comment.com_id"
type="c"
 />
<!-- 评论的回复列表/-->
</div>
 <!-- 发布评论 -->
 <div class="post_wrap">
      <van-button size="small" round class="post_btn" @click="isShow=true">
        发布评论
      </van-button>
    </div>
    <van-popup v-model="isShow" position="bottom" >
      <commentPost
      :target="comment.com_id"
      @post-success=onPostsuccess /></van-popup>
    <!-- 发布评论 /-->
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import commentItem from '@/components/comment-item.vue'
import CmmentList from '@/components/coent.liet.vue'
import commentPost from '@/components/commpon.post.vue'

export default {
// import 引入的组件需要注入到对象中才能使用
  components: {
    commentItem,
    CmmentList,
    commentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      isShow: false,
      commentList: [] // 评论的回复列表
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onPostsuccess (data) {
      console.log(data)
      // 更新回复的数量
      // eslint-disable-next-line vue/no-mutating-props
      this.comment.reply_count++
      // 关闭弹出层
      this.isShow = false
      // 将最新回复的内容展示到内容的顶部
      this.commentList.unshift(data.new_obj)
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
<style scoped lang="less">
  .scroll_wrap{
position: fixed;
top: 92px;
left: 0;
right: 0;
bottom: 88px;
overflow-y: auto;
  }
.post_wrap{
   height: 88px;
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #fff;
   .post_btn{
    width: 60%;
    border-top: 1px solid #d8d8d8;
   }
  }
</style>
