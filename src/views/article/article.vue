<!-- eslint-disable no-undef -->
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.aut_name">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <FollowUser
            :isFolloweb="article.is_followed"
            :userId="article.aut_id"
            class="follow-btn"
            @userId_followeb="isFolloweb = $event"
          ></FollowUser>
          <!-- 用$event接收传过来的参数  $even 是事件参数 -->
          <!-- <van-button
          v-if="article.is_followed"
          :loading="followLoading"
            class="follow-btn"
            round
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
          :loading="followLoading"
            @click="onFollow"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <CmmentList
        :list="CommtList"
        :CollectId="article.art_id"
        @ClickonLoad="Commentount=$event.total_count"
        @reply-click="onRepClick"
        />
        <!-- 文章评论 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn"
          type="default" round size="small"
          @click="isShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="Commentount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <Article
            class="van-icon"
            v-model="article.is_collected"
            :CollectId="article.art_id"
          />
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <linkArticle
            class="van-icon"
            v-model="article.attitude"
            :CollectId="article.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论 -->
        <van-popup v-model="isShow" position="bottom" >
        <commentPost
        :target="article.art_id"
        @post-success=onPostsuccess /></van-popup>
        <!-- 发布评论 /-->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isRepShow" position="bottom"
    style="height: 100%" >
    <CommentReply
    v-if="isRepShow"
    :comment="currentComment"
    @close="isRepShow=false" />
        </van-popup>
    <!-- 评论回复 /-->

  </div>
</template>

<script>
import FollowUser from '../../components/follow-user.vue'
import { AeticleByIdAPI } from '@/api/article'
import { ImagePreview } from 'vant'
import Article from '@/components/collectArticle.vue'
import linkArticle from '@/components/link-article.vue'
import CmmentList from '@/components/coent.liet.vue'
import commentPost from '@/components/commpon.post.vue'
import CommentReply from '../article/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  // 给所有的子组件提供数
  // 主要不要滥用
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  components: {
    FollowUser,
    Article,
    linkArticle,
    CmmentList,
    commentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
      default: null
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的loading状态
      errStatus: 0, // 失败的状态码
      followLoading: false,
      Commentount: 0,
      isShow: false, // 控制弹出层的显示隐藏
      CommtList: [], // 评论列表
      isRepShow: false, // 回复评论的弹出层
      currentComment: {} // 当前点击回复的评论项

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAeticle()
  },
  mounted () {},
  methods: {
    async loadAeticle () {
      try {
        const { data } = await AeticleByIdAPI(this.articleId)
        this.article = data.data
        // console.log(this.article)
        // 初始化图片点击预览
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败,请稍后再试')
      }
      // 请求成功 关闭加载提示 loading
      this.loading = false
    },
    previewImage () {
      // 获得所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 获取所有的img地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        // 给每个img注册点击事件
        img.onclick = () => {
          ImagePreview({
            // 图片存放地址的数组
            images,
            // 起始位置 从0开始   第一个索引开始
            startPosition: index
          })
        }
      })
    },
    onPostsuccess (data) {
      //  关闭弹出层
      this.isShow = false
      //   将留言添加到顶部
      this.CommtList.unshift(data.new_obj)
    },
    onRepClick (comment) {
      console.log(comment)
      this.currentComment = comment
      this.isRepShow = true
    }
  }

}
</script>

<style scoped lang="less">
@import "./css/github-markdown.css";
.article-container {
  .main-wrap {
    padding-top: 92px;
    padding-bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
