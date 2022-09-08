<template>
  <div class="updata_name">
   <van-nav-bar
  title="昵称"
  left-text="取消"
  right-text="完成"
  @click-left="$emit('close')"
  @click-right="onConfirm()"
/>
<!-- 输入框 -->
<div class="field_wrap">
   <van-field
  v-model.trim="Locaname"
  rows="2"
  autosize
  type="textarea"
  maxlength="7"

  placeholder="请输入昵称"
  show-word-limit
/>
</div>
<!-- 输入框 / -->
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api'
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
// import { updateUserProfileAPI ,updateUserProfileAPI } from '@/api/index'
export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    value: {
      type: String
    }
  },
  data () {
    // 这里存放数据
    return {
      Locaname: this.value

    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onConfirm () {
      this.$router.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 默认两秒 0是持续展示
      })
      try {
        const Locaname = this.Locaname
        if (!Locaname.length) {
          this.$toast('昵称不能为空')
        }
        const res = await updateUserProfileAPI({
          name: Locaname
        })
        console.log(res)
        //   更新视图
        this.$emit('input', Locaname)
        // 关闭弹层
        this.$emit('close')
        // 修改成功
        this.$toast.success('更新成功')
      } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 409) {
          this.$toast('用户名已存在')
        }
        this.$toast.fail('更新失败,请检查网络')
      }
    }
  }
  // 生命周期 - 创建完成（可以访问当前 this 实例）

}
</script>
<style scoped lang="less">
.field_wrap{
   padding: 20px;
}
</style>
