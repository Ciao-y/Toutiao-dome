<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="my_container">
    <!-- 已登录头部 -->
    <div class="header user_info" v-if="user" >
      <div class="base_info">
        <div class="left">
          <van-image
            round
            fit="cover"
            class="avater"
            :src="userInfo.photo"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data_stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div class="header not_login" v-else>
      <div class="login_btn" @click="$router.push('/login')">
        <img class="mobile_img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
    <i slot="icon" class="toutiao toutiao-shoucang" ></i>
    <span class="text" slot="text"> 收藏</span>
  </van-grid-item><van-grid-item class="grid-item" >
    <i slot="icon" class="toutiao toutiao-lishi" ></i>
    <span class="text" slot="text"> 历史</span>
  </van-grid-item>
</van-grid>
<van-cell title="消息通知" is-link />
    <van-cell class="mb" title="小智同学" is-link />
    <van-cell v-if="user" class="logout-cell" clickable title="退出登录" @click="onLogout()"  />
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { mapState } from 'vuex'
import { getUserinfoAPI } from '../../api/index.js'
export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    // 这里存放数据
    return {
      userInfo: {} // 用戶信息
    }
  },
  computed: {
    // 监听token
    ...mapState(['user'])
  },
  // 监控 data 中的数据变化
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 退出登录
    onLogout () {
      this.$dialog.confirm({
        title: '确定退出吗?'
      })
        .then(() => {
          // on confirm
          // 确定退出 执行的操作 清除token
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 请求用户数据
    async loadUserInfo () {
      try {
        const res = await getUserinfoAPI()
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败,请稍后重试')
      }
    }
  }

}
</script>
<style scoped lang="less">
  .my_container {
    .header {
      height: 361px;
      // 可以使用 @绝对路径 @代表src 要在前面加~
      background: url("~@/assets/banner.png") no-repeat;
      background-size: cover;
    }
    .not_login {
      display: flex;
      justify-content: center;
      align-items: center;
      .login_btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mobile_img {
          width: 132px;
          height: 132px;
        }
        .text {
          margin-top: 20px;
          font-size: 28px;
          color: #fff;
        }
      }
    }
    .user_info {
      .base_info {
        height: 231px;
        padding: 76px 32px 23px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avater {
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: 3px solid #fff;
          }
          .name {
            font-size: 30px;
            color: #fff;
          }
        }
      }
      .data_stats {
        display: flex;
      }
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
    .grid-nav{
      .grid-item{
        height: 141px;
        i.toutiao{
          font-size: 45px ;
        }
        .toutiao-shoucang{
            color:#eb5253;
          }.toutiao-lishi{
            color: #ff9d1d;
          }span.text{
          font-size: 28px;
        }
      }
    }
    .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb {
    margin-bottom: 9px;
  }
  }
</style>
