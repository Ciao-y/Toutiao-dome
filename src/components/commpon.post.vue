<template>
   <div class="post-comment">
     <van-field
       class="post-field"
       v-model.trim="message"
       rows="2"
       autosize
       type="textarea"
       maxlength="50"
       placeholder="优质评论将会被优先展示"
       show-word-limit
     />
     <van-button
       class="post-btn"
       size="small"
       @click="onPost"
       :disabled="!message.length"
     >发布</van-button>
   </div>
 </template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      // this.$toast.loading({
      //   message: '发布中...',
      //   FormDataEvent: true, // 禁用背景点击
      //   duration: 0 // 持续事件,默认2000毫秒 0表示持续点击不关闭
      // })
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
        })
        console.log(data)

        //   发布后清空文本内容
        this.$emit('post-success', data.data)
        this.message = ''
      } catch (err) {
        this.$toast.fail('请稍后再试')
      }
    }
  }
}
</script>

 <style scoped lang="less">
 .post-comment {
   display: flex;
   align-items: center;
   padding: 32px 0 32px 32px;
   .post-field {
     background-color: #f5f7f9;
   }
   .post-btn {
     width: 150px;
     border: none;
     padding: 0;
     color: #6ba3d8;
     &::before {
       display: none;
     }
   }
 }
 </style>
