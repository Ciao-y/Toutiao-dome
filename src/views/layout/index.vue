<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="layout_container">
   <!-- 子路由出口 -->
   <router-view></router-view>
   <!-- 子路由出口 -->
   <!-- 标签导航栏 -->
   <!-- :route 开启路由模式 -->
   <van-tabbar  class="layout_tabber" route>
    <van-tabbar-item to="/home">
    <i slot="icon" class="toutiao toutiao-shouye"></i>
    <span class="tetx">首页</span>
    </van-tabbar-item><van-tabbar-item to="/faqs">
    <i slot="icon" class="toutiao toutiao-wenda"></i>
    <span class="text">问答</span>
    </van-tabbar-item><van-tabbar-item to="/flv">
    <i slot="icon" class="toutiao toutiao-shipin"></i>
    <span class="text">视频</span>
    </van-tabbar-item><van-tabbar-item to="/my">
    <i slot="icon" class="toutiao toutiao-wode"></i>
    <span  class="text">{{$store.state.user?'我的':'未登录'}}</span>
    </van-tabbar-item>

</van-tabbar>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';

export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    // 这里存放数据
    return { }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
.layout_container{
  .layout_tabber{
    spna.text{
      font-size: 20px;
    }
   i.toutiao{
   font-size: 40px;
   }
  }
}
</style>
