<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home_container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search_btn"
        slot="title"
        type="info"
        size="search"
        icon="search"
        to="/search"
        round
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 頻道列表 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs v-model="active" class="channel_tabs" animated swipeable>
      <van-tab
        :title="obj.name"
        v-for="(obj, index) in Channellist"
        :key="index"
      >
        <ArticleList :obj="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger" @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 頻道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
      ><ChannelEdit
        :Channellist="Channellist"
        :active="active"
        @upactive="onactive"
      ></ChannelEdit>
    </van-popup>
    <!-- 频道编辑弹出层 -->
  </div>
</template>

<script>
import { channelAPI } from '../../api/index'
import ArticleList from '../home/components/article-list.vue'
import ChannelEdit from '../home/components/channei-edit.vue'
export default {
  components: { ArticleList, ChannelEdit },
  props: {},
  data () {
    return {
      Channellist: [],
      show: false, // 控制弹出层的展示状态
      active: 0

    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async channel () {
      try {
        const { data } = await channelAPI()
        this.Channellist = data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    // 切换频道
    onactive (index) {
      this.active = index
      this.show = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {
    this.channel()
  }

}
</script>
<style scoped lang="less">
  .home_container {
    // position: fixed;
    padding-top: 100px;
    padding-bottom: 100px;
    /deep/.van-nav-bar__title {
      max-width: unset;
    }
    .search_btn {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 28px;
    }
    .van-icon {
      font-size: 32px;
    }
    /ddep/.channel_tabs {
      .van-tabs_wrap {
        position: fixed;
        top: 92px;
        z-index: 1;
        left: 0px;
        right: 0px;
        height: 82px;
      }
      .van-tab {
        min-width: 200px;
        font-size: 30px;
        border-right: 1px solid #edeff3;
        color: #777777;
      }
      .van-tab--active {
        color: #333333;
      }
      /deep/.van-tabs__nav--line {
        padding-bottom: 0 !important;
      }
      /deep/.van-tabs__line {
        width: 31px !important;
        height: 6px;
        bottom: 8px;
        background-color: #3296fa;
      }
      .placeholder {
        width: 66px;
        height: 82px;
        flex-shrink: 0;
      }
      /deep/.hamburger {
        position: fixed;
        display: flex;
        right: 0;
        width: 66px;
        height: 82px;
        z-index: 100;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        opacity: 0.902;
        i.toutiao {
          font-size: 33px;
        }
        &:before {
          position: absolute;
          left: 0;
          content: "";
          width: 1px;
          height: 100%;
          background-image: url(../../assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
    }
  }
</style>
